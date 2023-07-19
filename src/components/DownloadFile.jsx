import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'
import { backlocale } from 'constants/constindex';

function DownloadPListFile (fileData, fileName, sheetName, fileExType) {
    /*  
    Imported Variable Guide:
        - fileData = JSON Data imported from where function is called (preferably direct exported from Database Fetching)
        - fileName = Your wished file name to export
        - sheetName = *As the name suggested*
        - fileExType = File Extension (xlsx for csv)
    */
        //Global Variable
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.'+fileExType;

        //Download
    if (fileExType==="csv") {
        //File Configuration
        //Export in progress
        const exportToExcel = async () => {
            //New Worksheet and Workbook
            const ws = XLSX.utils.json_to_sheet(fileData);
            let wb = XLSX.utils.book_new();
            //Append Sheets into Workbook
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
            //Buffering
            const excelBuffer = XLSX.write(wb, { bookType: fileExType, type: 'array'});
            const data = new Blob([excelBuffer], { type: fileType });
            //Export
            FileSaver.saveAs(data, fileName + fileExtension);
        }
        return (exportToExcel(fileData, fileName, sheetName, fileExType));
    } else {
        const data = {
            fileData: fileData,
            fileName: fileName,
            sheetName: sheetName,
            fileExType: fileExType
        }
        let loc = backlocale+"down/downpart";
        fetch(loc, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Acess-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, PUT, POST, DELETE, PATCH, OPTIONS",
            },
            body: JSON.stringify(data),
        })
        .catch((err) => {
            return;
        })
        .then((res) => {
            return res.blob()
        })
        .then((data) => {
            if (!data) return;
            const url = URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName+".xls";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        });
    }
}

export {DownloadPListFile}
