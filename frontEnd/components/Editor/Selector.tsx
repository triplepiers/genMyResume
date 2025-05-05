import { Palette } from "@/components/Editor/Palette";
import { FaPaintRoller } from "react-icons/fa6";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

export const ColorSelector = (props: {
    updateThemeClr: Function,
    defaultClr: string
}) => {
    const { updateThemeClr, defaultClr } = props;
    return (
        <Drawer direction='left'>
            <DrawerTrigger asChild>
                <div className="custom-option-set">
                    <FaPaintRoller className="custom-option-icon" />
                    Design
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Theme Color Selector</DrawerTitle>
                    <DrawerDescription>Choose your favourite color.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <Palette updateThemeClr={updateThemeClr} defaultClr={defaultClr}/>
                </div>
            </DrawerContent>
        </Drawer>
    )
}