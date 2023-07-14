import * as FileSaver from 'file-saver'
import XLSX from 'sheetjs-style'

function DownloadFile (fileData, fileName, sheetName, fileExType) {
    /*  
    Imported Variable Guide:
        - fileData = JSON Data imported from where function is called (preferably direct exported from Database Fetching)
        - fileName = Your wished file name to export
        - sheetName = *As the name suggested*
        - fileExType = File Extension (xlsx for csv)
    */

    //File Configuration
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.'+fileExType;

    //Export in progress
    const exportToExcel = async () => {
        //New Worksheet and Workbook
        const ws = XLSX.utils.json_to_sheet(fileData);
        let wb = XLSX.utils.book_new();
        //Append Sheets into Workbook
        XLSX.utils.book_append_sheet(wb, ws, sheetName)
        //Buffering
        const excelBuffer = XLSX.write(wb, { bookType: fileExType, type: 'array'});
        const data = new Blob([excelBuffer], { type: fileType });
        //Export
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (exportToExcel(fileData, fileName, sheetName, fileExType))
}

function Download1File2 (fileData1, fileData2, fileName, sheetName, fileExType) {
    /*  
    Imported Variable Guide:
        - fileData = JSON Data imported from where function is called (preferably direct exported from Database Fetching)
        - fileName = Your wished file name to export
        - sheetName = *As the name suggested*
        - fileExType = File Extension (xlsx for csv)
    */

    //File Configuration
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.'+fileExType;

    //Export in progress
    const exportToExcel = async () => {
        //New Worksheet and Workbook
        const ws1 = XLSX.utils.json_to_sheet(fileData1);
        const ws2 = XLSX.utils.json_to_sheet(fileData2);
        let wb = XLSX.utils.book_new();
        //Append Sheets into Workbook
        XLSX.utils.book_append_sheet(wb, ws1, sheetName+" 1")
        XLSX.utils.book_append_sheet(wb, ws2, sheetName+" 2")
        //Buffering
        const excelBuffer = XLSX.write(wb, { bookType: fileExType, type: 'array'});
        const data = new Blob([excelBuffer], { type: fileType });
        //Export
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (exportToExcel(fileData1, fileData2, fileName, sheetName, fileExType))
}

export {DownloadFile, Download1File2}