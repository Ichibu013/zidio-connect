import SiteNameIcon from "../misc/SiteIcon";

export default function BasicHeader() {
    return (
        <div className="bg-white p-4 w-full mx-auto">
            <div className="flex item-center justify-center space-x-2">
                <SiteNameIcon />
            </div>
        </div>
    )
}