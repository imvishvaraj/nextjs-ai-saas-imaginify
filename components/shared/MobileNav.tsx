import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from "@/constants"
import { SignedIn, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"


const MobileNav = () => {
    const pathname = usePathname();
    
    return (
        <header className="header">
            <Link href="/" className='flex items-center gap-2 md:py-2'>
                <Image
                    src="/assets/images/logo-text.svg"
                    alt='logo'
                    width={180}
                    height={28}
                />
                <nav className="flex gap-2">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />

                        {/* <div className="content-end "> */}
                        <Sheet>
                            <SheetTrigger>
                                <Image
                                    src="/assets/icons/menu.svg"
                                    alt="menu"
                                    width={32}
                                    height={32}
                                    className="cursor-pointer"
                                />
                            </SheetTrigger>
                            <SheetContent className="sheet-content sm:w-64">
                                <SheetHeader>
                                    <>
                                        <Image
                                            src="assets/images/logo-text.svg"
                                            alt='logo'
                                            width={152}
                                            height={23}
                                        />

                                        <ul className='sidebar-nav_elements'>
                                            {navLinks.slice(0, 6).map((link) => {
                                                const isActive = link.route === pathname

                                                return (
                                                    <li key={link.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                                                        }`}>
                                                        <Link className='sidebar-link' href={link.route} >
                                                            <Image
                                                                src={link.icon}
                                                                alt='logo'
                                                                width={24}
                                                                height={24}
                                                                className={`${isActive && 'brightness-200'}`}
                                                            />
                                                            {link.label}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>

                        {/* </div> */}

                    </SignedIn>
                </nav>
            </Link>
        </header>
    )
}

export default MobileNav