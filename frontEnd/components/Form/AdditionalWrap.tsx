import { useEffect } from "react";

export const AdditionalWrap = (props: { updateFormMeta: Function }) => {
    useEffect(() => {
        props.updateFormMeta({
            title: 'Additional Blocks',
            desc: 'Add anything you like',
        })
    }, [])

    return (
        <div>TODO</div>
    )
}