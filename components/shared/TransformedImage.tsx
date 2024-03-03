import { dataUrl, debounce, getImageSize } from '@/lib/utils'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import React from 'react'

const TransformedImage = ({
    image,
    type,
    title,
    isTransforming,
    setIsTranforming,
    tranformationConfig,
    hasDownload = false
}: TransformedImageProps) => {
    const downloadHandler = () => { }
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex-between'>
                <h3 className='h3-bold text-dark-600'>
                    Transformed
                </h3>

                {hasDownload && (
                    <button
                        className='download-btn'
                        onClick={downloadHandler}
                    >
                        <Image
                            src="/assets/icons/download.svg"
                            alt="Download"
                            width={24}
                            height={24}
                            className='pb-[6px]'
                        />
                    </button>
                )}
            </div>

            {image?.publicId && tranformationConfig ? (
                <div className='relative'>
                    <CldImage
                        width={getImageSize(type, image, "width")}
                        height={getImageSize(type, image, "height")}
                        src={image?.publicId}
                        alt={image.title}
                        sizes={"(max-width: 768px) 100vw, 50vw"}
                        placeholder={dataUrl as PlaceholderValue}
                        className="transformed-image"
                        onLoad={() => {
                            setIsTranforming && setIsTranforming(false);
                        }}
                        onError={() => {
                            debounce(() => {
                                setIsTranforming && setIsTranforming(false);
                            }, 8000)
                        }}
                        {...tranformationConfig}
                    />
                </div>
            ) : (
                <div className='transformed-placeholder'>
                    Transformed Image
                </div>
            )}

        </div>
    )
}

export default TransformedImage