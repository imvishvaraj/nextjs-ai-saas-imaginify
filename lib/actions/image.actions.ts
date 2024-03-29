'use server';

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

import { v2 as cloudinary } from "cloudinary";


const populateUser = (query: any) => query.pupulate({
    path: "author",
    model: User,
    select: '_id firstName lastName'
})


// add image
export async function addImage({ image, userId, path }: AddImageParams) {
    try {
        await connectToDatabase();
        console.log("inside addImage. connectedtodb")
        console.log('user id: ', userId)

        const author = await User.findById(userId)
        console.log("author", author)

        if (!author) {
            throw new Error("User not found");
        }

        const newImage = await Image.create({
            ...image,
            author: author._id,
        })
        console.log("created new image", newImage)

        revalidatePath(path);

        return JSON.parse(JSON.stringify(newImage));
    } catch (error) {
        handleError(error);
    }
}


// update image
export async function updateImage({ image, userId, path }: UpdateImageParams) {
    try {
        await connectToDatabase();

        const imageToUpdate = await Image.findById(image._id);

        if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
            throw new Error("Unauthorized or Image not found");
        }

        const updatedImage = await Image.findByIdAndUpdate(
            imageToUpdate._id,
            image,
            { new: true }
        )

        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedImage));
    } catch (error) {
        handleError(error);
    }
}


// delete image
export async function deleteImage(imageId: string) {
    try {
        await connectToDatabase();

        await Image.findByIdAndDelete(imageId);
    } catch (error) {
        handleError(error);
    } finally {
        redirect("/")
    }
}


// get image
export async function getImageById(imageId: string) {
    try {
        await connectToDatabase();

        const image = await populateUser(Image.findById(imageId));

        if (!image) throw new Error("Image not found")

        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error);
    }
}


// get all images
export async function getAllImages({ limit = 9, page = 1, searchQuery = ''}: {
    limit?: number;
    page: number;
    searchQuery?: string;
}) {
    try {
        await connectToDatabase();

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
        })
        
        let expression = 'folder=imaginify';

        if (searchQuery) {
            expression += ` AND ${searchQuery}`
        }

        const  { resources } = await cloudinary.search
            .expression(expression)
            .execute();
        
        // console.log("all images resources: ", resources)
        
        const resourceIds = resources.map((resource: any) => resource.public_id)
        // console.log("all images resourceIds: ", resourceIds)

        let query = {};

        if (searchQuery){
            query = {
                publicId: {
                    $in: resourceIds
                }
            }
        }

        // console.log("all images query: ", query)

        const skipAmount = (Number(page) -1) * limit;

        const res = Image.find(query).populate({
            path: "author",
            model: User,
            select: '_id firstName lastName'        })
        // console.log('res', res)

        // const res = await 
        
        const images =  await res
            .sort({ updatedAt: -1 })
            .skip(skipAmount)
            .limit(limit);
        
        
        
        const totalImages = await Image.find(query).countDocuments();
        const savedImages = await Image.find().countDocuments();

        return {
            data:  JSON.parse(JSON.stringify(images)),
            totalPage: Math.ceil(totalImages / limit),
            savedImages,

        }
    } catch (error) {
        handleError(error);
    }
}