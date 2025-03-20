/*
    Ref:
    https://www.oryoy.com/news/shi-yong-react-he-jspdf-shi-xian-dom-zhuan-pdf-de-xiang-xi-bu-zhou-yu-dai-ma-shi-li.html
*/
import styles from '@/styles/pdf.module.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const PdfGenerator = () => {
    const quality = 2; // 必须和央视表对应
    const generate = (isPDF: boolean) => {
        const input = document.getElementById("pdf") as HTMLElement;
        html2canvas(input, {
            width: 210 * quality,
            height: 297 * quality
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png", 1);
            if (isPDF) {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save("resume.pdf");
            } else {
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'resume.png';
                link.click();
            }

        });
    }

    return (
        <div className={styles.container}>
            <div id="pdf" className={styles.pdf}>
                <h1>PDF Generator</h1>
                <p>PDF Generator</p>
            </div>
            <button onClick={() => generate(true)} className={styles.btn}>Generate PDF</button>
            <button onClick={() => generate(false)} className={styles.btn}>Generate PNG</button>
        </div>
    )
};
