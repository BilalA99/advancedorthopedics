// components/SidebarNavItem.jsx (or wherever you place components)
import Link from 'next/link';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"; // Adjust import path
import PromoOverlayCard from './PromoOverlayCard';
import NavCompactBlogCard from './NavCompactBlogCard';

// Define types for props
interface SidebarNavItemProps {
    item: {
        title: string;
        href?: string;
        short_desc?: string;
        icon?: React.ComponentType<any>;
        subLinks?: SidebarNavItemProps['item'][];
    };
    pathname: string;
    closeSidebar: () => void;
    level?: number;
    latestBlog?: any;
}

export const SidebarNavItem = ({ item, pathname, closeSidebar, level = 0, latestBlog }: SidebarNavItemProps) => {
    const hasSublinks = item.subLinks && item.subLinks.length > 0;

    // Calculate indentation based on nesting level
    // Using padding-left for indentation. Adjust multiplier as needed.
    const paddingLeftValue = `${1 + level * 1.25}rem`; // Base 1rem, +1.25rem per level

    if (hasSublinks) {
        // --- Render Accordion for items with sublinks ---
        const uniqueAccordionItemId = `sidebar-${item.title.replace(/\s+/g, '-')}-${level}`;

        // Note: Each level gets its own Accordion context here.
        // This allows multiple items at the same level to be open if you change type="multiple" below.
        // For strict one-item-open-per-level, more complex state management outside would be needed.
        return (
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={uniqueAccordionItemId} className="border-b-0">
                    <AccordionTrigger

                        style={{ paddingLeft: paddingLeftValue }}
                        // Adjust styling based on level if needed (e.g., text size)
                        className={`py-2  rounded-md text-base font-medium text-gray-700 text-left hover:bg-gray-100 hover:text-gray-900 hover:no-underline data-[state=open]:bg-gray-50 w-full`}
                    >
                        <Link href={item.href || '#'} onClick={closeSidebar} className="flex w-fit items-center gap-3">
                            {item.icon && (
                                <span className="p-2 rounded-xl border aspect-square flex items-center justify-center">
                                    {(() => { const Icon = item.icon!; return <Icon className='w-4 h-4 text-[#252932]' /> })()}
                                </span>
                            )}
                            <span className="flex flex-col items-start min-w-0">
                                <span className="truncate">{item.title}</span>
                                {item.short_desc && (
                                    <span className="text-xs text-gray-500 truncate">{item.short_desc}</span>
                                )}
                            </span>
                        </Link> {/* Add truncate if titles get long */}
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 pb-0 "> {/* No base padding needed, handled by recursive calls */}

                        <ul className="flex flex-col space-y-1">
                            {/* Recursive call for sublinks */}
                            {item.subLinks!.map((sublink, subIndex) => (
                                <SidebarNavItem
                                    key={`${uniqueAccordionItemId}-sub-${subIndex}`}
                                    item={sublink}
                                    pathname={pathname}
                                    closeSidebar={closeSidebar}
                                    level={level + 1} // Increment level for indentation
                                />
                            ))}
                        </ul>
                        {
                            item.title == 'FIND CARE' ? (
                                <div className='w-full flex items-center justify-center px-6 py-4'>
                                    <PromoOverlayCard
                                        link="/conditions/spinal-stenosis"
                                        onClick={closeSidebar}
                                        className="max-h-40 h-40 w-full sm:max-h-100 sm:h-fit" /></div>
                            )
                                : item.title == 'AREA OF SPECIALTY' ? (
                                    <div className='w-full flex items-center justify-center px-6 py-4'>
                                        <PromoOverlayCard
                                            onClick={closeSidebar}
                                            className="max-h-40 h-40 w-full sm:max-h-100 sm:h-fit"
                                            imageUrl="https://mountainspineortho.b-cdn.net/public/lowerbackpain.png"
                                            title="Lower Back Pain?"
                                            subtitle="Meet with our fellowship-trained surgeons today"
                                            link={`/conditions?data=${encodeURIComponent(JSON.stringify({ tags: ['Spine'] }))}`}

                                        /></div>
                                )
                                    : item.title == 'LOCATION' ? (
                                        <div className='w-full flex items-center justify-center px-6 py-4'>
                                            <PromoOverlayCard
                                                onClick={closeSidebar}
                                                className="max-h-40 h-40 w-full sm:max-h-100 sm:h-fit"
                                                imageUrl="/centralflorida.png"
                                                title="Serving Florida"
                                                subtitle="20+ Years of Orthopedic Care for Florida."
                                            />
                                        </div>
                                    )
                                        : item.title == 'ABOUT' ? (
                                            <div className='w-full flex items-center justify-center sm:justify-start px-6 py-4'>
                                                {latestBlog && (
                                                    <div className='w-70'>
                                                        <NavCompactBlogCard blog={latestBlog.blog_info} slug={latestBlog.slug} onClick={closeSidebar} />
                                                    </div>
                                                )}
                                            </div>
                                        ) : null

                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    } else {
        // --- Render simple Link for items without sublinks ---
        return (
            <li>
                <Link
                    href={item.href || '#'} // Provide a fallback href
                    style={{ paddingLeft: paddingLeftValue }} // Apply indentation
                    className={`flex w-full py-2 rounded-md text-base text-left font-medium items-center gap-3 hover:no-underline ${pathname === item.href
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    onClick={closeSidebar}
                >
                    {item.icon && (
                        <span className="p-2 rounded-xl border aspect-square flex items-center justify-center">
                            {(() => { const Icon = item.icon!; return <Icon className='w-4 h-4 text-[#252932]' /> })()}
                        </span>
                    )}
                    <span className="flex flex-col items-start min-w-0">
                        <span className="truncate">{item.title}</span>
                        {item.short_desc && (
                            <span className="text-xs text-gray-500 truncate">{item.short_desc}</span>
                        )}
                    </span>
                </Link>
            </li>
        );
    }
};
