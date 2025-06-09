import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Heading } from "@/components/Form/Heading";
import { EducationWrap } from "@/components/Form/EduWrap";
import { WorkWrap } from "@/components/Form/WorkWrap";
import { MoreInfoWrap } from "@/components/Form/MoreInfoWrap";
import { AdditionalWrap } from "@/components/Form/AdditionalWrap";
import { SelfStatement } from "@/components/Form/SlefStatement";
import { ChevronRight } from "lucide-react";

// 样式
const btn_base_style = '\
cursor-pointer rounded-md font-medium\
block px-4 py-[0.2rem] min-w-[6rem] shrink-0\
brightness-100 hover:brightness-125'

type FormMeta =  { title: string, desc: string }

export default function Checkout(props: any[]) {
    // 路由相关
    const router = useRouter();
    // 登录拦截器
    useEffect(() => {
        const account = localStorage.getItem('account');
        if (!account) router.push('/login');
    }, []);

    // stepper 组件
    const steps = [                // ? optional
        ['Head', false],
        ['Education', false],
        ['Work Experience', false],
        ['Skills', true],
        ['Additional', true],
        ['Self-Statement', false],
    ]
    const [activeStep, setActiveStep] = useState<number>();
    const parseActiveStep = (stepStr: any) => {
        if (stepStr) {
            const step = parseInt(stepStr);
            if (step >= 0 && step < steps.length && step !== activeStep) {
                setActiveStep(step);
            }
        } else if (activeStep != 0) {
            setActiveStep(0);
        }
    }
    parseActiveStep(router.query.step);
    function getStepContent(step: number) {
        if (step === undefined) return <></>;
        switch (step) {
            case 0:
                return <Heading updateFormMeta={handleFormMeta} updateFormStatus={goNextStep}/>;
            case 1:
                return <EducationWrap updateFormMeta={handleFormMeta}/>;
            case 2:
                return <WorkWrap updateFormMeta={handleFormMeta}/>;
            case 3:
                return <MoreInfoWrap updateFormMeta={handleFormMeta}/>;
            case 4:
                return <AdditionalWrap updateFormMeta={handleFormMeta}/>;
            case 5:
                return <SelfStatement updateFormMeta={handleFormMeta}/>;
            default:
                throw new Error('Unknown Step!');
        }
    }
    const trySubmit = () => { 
        if (activeStep == 0) {
            document.getElementById('GO')?.click()
        } else {
            goNextStep();
        }
    }
    const goNextStep = () => {
        if (activeStep === undefined) return;
        if (activeStep === steps.length - 1) { router.push('/result') } 
        else                                 { 
            setActiveStep(cur => cur!+1) 
            router.push(`/checkout?step=${activeStep+1}`)
        }
    }
    const goTargetStep = (targetStep: number) => {
        // 手动保存 Heading 会有 bug，不存了
        if (targetStep != activeStep) {
            setActiveStep(targetStep);
            router.push(`/checkout?step=${targetStep}`)
        }
    }
    const goPrevStep = () => { 
        if (activeStep === undefined || activeStep === 0) return;
        setActiveStep(cur => cur! - 1)
        router.push(`/checkout?step=${activeStep-1}`)
    }

    // 表单信息
    const [formTitle, setFormTitle] = useState('');
    const [formDesc,  setFormDesc]  = useState('');
    const handleFormMeta = (neoFormMeta: FormMeta) => {
        setFormTitle(neoFormMeta.title);
        setFormDesc(neoFormMeta.desc);
    }

    return (
        <div className="flex flex-col w-screen min-h-[calc(100vh-var(--header-height))] p-10 pt-5 gap-3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-y-2">
            <div className="flex flex-wrap gap-[1.5] font-medium leading-tight items-center">
                <div className="text-[var(--foreground)] font-bold pr-2">Steps: </div>
                {
                    steps.map((step, idx) => {
                        return (
                            <>
                            <div key={idx} 
                            className={`
                                cursor-pointer hover:text-[var(--blue)] duration-200
                                ${activeStep === idx ? 'text-[var(--pink)]' : 'text-gray-500'}`}
                            data-step={idx}
                            onClick={(e) => goTargetStep(parseInt(e.target.dataset.step))}
                            >
                                {step[0]}
                            </div>
                            {idx !== steps.length - 1 ? (<ChevronRight className="w-4 h-4 text-gray-500"/>):(<></>)}
                            </>
                        )
                    })
                }
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
            <div className="grow-1 w-100%
            flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">{formTitle}</h1>
                <p dangerouslySetInnerHTML={{ __html: formDesc}} className="mt-2 mb-5"></p>
                <div className="w-full max-w-190 flex justify-center">
                    {(getStepContent(activeStep!))}
                </div>
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