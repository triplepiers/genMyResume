import { useEffect } from "react";

export const Heading = (props: {updateFormMeta: any}) => {
    useEffect(() => {
        props.updateFormMeta({
            title: 'Resume Heading',
            desc:  'We suggest including an <b>email</b> and <b>phone number</b>'
        })
    })
    return (
        <>
        <div>
            sdf 
        {/* <Input variant="static" label="Static" placeholder="Static" /> */}
        </div>
            {/*  */}
        </>
    )
};