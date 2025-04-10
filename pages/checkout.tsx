import { useState } from "react";
import { useRouter } from "next/router";

import { Heading } from "@/components/Form/Heading";
import { EducationWrap } from "@/components/Form/EduWrap";

// 样式
const btn_base_style = '\
cursor-pointer rounded-md font-medium\
block px-4 py-[0.2rem] min-w-[6rem] shrink-0\
duration-300 hover:-translate-y-1'

type FormMeta =  { title: string, desc: string }

export default function Checkout(props: any[]) {
    // 路由相关
    const router = useRouter()

    // stepper 组件
    // 节点
    const steps = [                // ? optional
        ['Heading', false],
        ['Education', false],
        ['Working Experience', false],
        ['Award & Certificates', true],
        ['Additional Information', true],
        ['Slef-Statement', false],
    ]
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                // return <Heading updateFormMeta={handleFormMeta} updateFormStatus={goNextStep}/>;
            case 1:
                return <EducationWrap updateFormMeta={handleFormMeta} updateFormStatus={goNextStep}/>;
            case 2:
                // return 'work';
            case 3:
            case 4:
            case 5:
                return (<span>{steps[step]}</span>);
            default:
                throw new Error('Unknown Step!');
        }
    }
    const [activeStep, setActiveStep] = useState(0)
    const trySubmit = () => { 
        if (activeStep == 0) {
            document.getElementById('GO')?.click()
        } else {
            goNextStep();
        }
    }
    const goNextStep = () => {
        if (activeStep === steps.length - 1) { router.push('/result') } 
        else                                 { setActiveStep(cur => cur + 1) }
    }
    const goPrevStep = () => { setActiveStep(cur => cur - 1) }

    // 表单信息
    const [formTitle, setFormTitle] = useState('');
    const [formDesc,  setFormDesc]  = useState('');
    const handleFormMeta = (neoFormMeta: FormMeta) => {
        setFormTitle(neoFormMeta.title);
        setFormDesc(neoFormMeta.desc);
    }

    return (
        <div className="flex flex-col w-screen min-h-[calc(100vh-var(--header-height))] p-10 gap-3">
            <div>这是该死的 Stepper，你在：{steps[activeStep]}</div>
            <div className="grow-1 border-1 w-100%
            flex flex-col items-center">
                <h1 className="text-3xl font-bold">{formTitle}</h1>
                <p dangerouslySetInnerHTML={{ __html: formDesc}} className="mt-2 mb-5"></p>
                <div className="w-full flex justify-center">
                    {(getStepContent(activeStep))}
                </div>
            </div>
            {/* button wrap */}
            <div className="w-100% flex justify-end gap-3">
                {
                    activeStep !== 0 &&
                    (<button onClick={goPrevStep}
                    className={`${btn_base_style} bg-[var(--foreground)] text-[var(--background)]`}>
                        Prev
                    </button>)
                }
                {
                    (activeStep === steps.length - 1) ?
                    (<button onClick={trySubmit} type="submit" form='headingForm'
                        className={`${btn_base_style} bg-[var(--green)] font-bold`}>
                        Finished!
                    </button>):
                    (<button onClick={trySubmit} className={`${btn_base_style} bg-[var(--blue)] font-bold`}>
                        Next
                    </button>)
                }
            </div>
        </div>
    )
}

export function getStaticProps() {
    return {
        props: {
            pageName: "Checkout",
        },
    };
}