import { useRouter } from "next/router"
import { useState, Fragment } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { HeadingForm } from "@/components/Form/HeadingForm";
import { EducationForm } from "@/components/Form/EducationForm";
import PaymentForm from '@/components/Form/PaymentForm';
import Review from '@/components/Form/Review';



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
            // return <HeadingForm />;
            return <EducationForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        case 3:
        case 4:
        case 5:
            return (<div>steps[step]</div>);
        default:
            throw new Error('Unknown Step!');
    }
}

export default function Checkout(props: any[]) {
    const router = useRouter()
    const Jump = () => {
        // 这里缺一个登录验证
        router.push('/result')
    }

    const [activeStep, setActiveStep] = useState(0);
    const goNextStep = () => { setActiveStep(cur => cur + 1) }
    const goPrevStep = () => { setActiveStep(cur => cur - 1) }

    return (
        <>
            <div className="w-screen min-h-[calc(100vh-var(--header-height))]
            flex flex-col items-center
            px-10 pt-10">
                <>
                    {/* Form */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: { sm: '100%', md: 600 },
                            gap: { xs: 5, md: 'none' },
                        }}
                    >
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                            sx={{ display: 'flex' }}
                        >
                            {steps.map((label) => (
                                <Step
                                    sx={{
                                        ':first-child': { pl: 0 },
                                        ':last-child': { pr: 0 },
                                        '& .MuiStepConnector-root': { top: { xs: 11 } },
                                    }}
                                    key={label}
                                >
                                    <StepLabel
                                        sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Stack spacing={2} useFlexGap>
                                <Typography variant="h1">📦</Typography>
                                <Typography variant="h5">Thank you for your order!</Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Your order number is
                                    <strong>&nbsp;#140396</strong>. We have emailed your order
                                    confirmation and will update you once its shipped.
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                                >
                                    Go to my orders
                                </Button>
                            </Stack>
                        ) : (
                            <Fragment>
                                {getStepContent(activeStep)}
                                <Box
                                    sx={[
                                        {
                                            display: 'flex',
                                            flexDirection: { xs: 'column-reverse', sm: 'row' },
                                            alignItems: 'end',
                                            flexGrow: 1,
                                            gap: 1,
                                            pb: { xs: 12, sm: 0 },
                                            mt: { xs: 2, sm: 0 },
                                            mb: '60px',
                                        },
                                        activeStep !== 0
                                            ? { justifyContent: 'space-between' }
                                            : { justifyContent: 'flex-end' },
                                    ]}
                                >
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={goPrevStep}
                                            variant="text"
                                            sx={{ display: { xs: 'none', sm: 'flex' } }}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    {activeStep !== 0 && (
                                        <Button
                                            startIcon={<ChevronLeftRoundedIcon />}
                                            onClick={goPrevStep}
                                            variant="outlined"
                                            fullWidth
                                            sx={{ display: { xs: 'flex', sm: 'none' } }}
                                        >
                                            Previous
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        endIcon={<ChevronRightRoundedIcon />}
                                        onClick={goNextStep}
                                        sx={{
                                            width: { xs: '100%', sm: 'fit-content' },
                                        }}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finished!' : 'Next'}
                                    </Button>
                                </Box>
                            </Fragment>
                        )}
                    </Box>
                </>
                {/* <button className="bg-[var(--pink)] font-medium text-white
            px-[2rem] py-[0.5rem] rounded-[5px]
            cursor-pointer"
                    onClick={() => Jump()}>
                    Finished !
                </button> */}
            </div>
        </>
    )
}

export function getStaticProps() {
    return {
        props: {
            pageName: "CheckOut",
        },
    };
}