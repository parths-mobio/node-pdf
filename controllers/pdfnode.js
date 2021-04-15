const fs = require('fs');
const pdfParse = require('pdf-parse');
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Invoice');

exports.readPdf = async (req, res) => {

    const buffer = fs.readFileSync("./hello.pdf");
    try {
        const data = await pdfParse(buffer);
        const pdfdata = data.text;
        console.log('Content: ', pdfdata);
        const mypdf = pdfdata.split("\n");
        var style = wb.createStyle({
            font: {
                //color: '#FF0800',
                size: 11,
                bold: true,

            },
            alignment: {
                shrinkToFit: true,
            }

        });
        const refdata1 = mypdf[41].split(" ");
        const refdata2 = mypdf[46].split(" ");
        const refdata3 = mypdf[51].split(" ");
        const refdata4 = mypdf[56].split(" ");
        const unitdata1 = mypdf[44].split(" ");
        const unitdata2 = mypdf[49].split(" ");
        const unitdata3 = mypdf[54].split(" ");
        const unitdata4 = mypdf[59].split(" ");
        const mydata = [
            {
                Supplier_No: mypdf[9],
                customer_name: mypdf[40],
                order_number: mypdf[15],
                order_date: mypdf[20],
                products: [
                    {
                        Sr_No: "1",
                        item_ref_no: refdata1[3],
                        product_description: mypdf[42],
                        unit_cost: unitdata1[3],
                        Total_Amount: refdata1[1]
                    },
                    {
                        Sr_No: "2",
                        item_ref_no: refdata2[3],
                        product_description: mypdf[47],
                        unit_cost: unitdata2[3],
                        Total_Amount: refdata2[1]
                    },
                    {
                        Sr_No: "3",
                        item_ref_no: refdata3[3],
                        product_description: mypdf[52],
                        unit_cost: unitdata3[3],
                        Total_Amount: refdata3[1]
                    },
                    {
                        Sr_No: "4",
                        item_ref_no: refdata4[3],
                        product_description: mypdf[57],
                        unit_cost: unitdata4[3],
                        Total_Amount: refdata4[1]
                    }

                ]
            }
        ];

        const headingColumnNames = [
            "Supplier_No :",
            "customer_name :",
            "order_number :",
            "order_date :",
        ]

        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(headingColumnIndex++, 1).style(style)
                .string(heading)
        });

        const productColumnNames = [
            "Sr_No",
            "item_ref_no",
            "product_description",
            "unit_cost",
            "Total_Amount",
        ]

        let productColumnIndex = 1;
        productColumnNames.forEach(heading => {
            ws.cell(6, productColumnIndex++).style(style)
                .string(heading)
        });

        let rowIndex = 2;
        mydata.forEach(record => {
            let columnIndex = 1;
            Object.keys(record).forEach(columnName => {
                ws.cell(columnIndex++, rowIndex)
                    .string(record[columnName])
            });
            rowIndex++;
        });

        let productdata = mydata[0].products;

        console.log(mydata[0].products);
        let rowIndex2 = 7;
        productdata.forEach(prodata => {
            let columnIndex2 = 1;
            Object.keys(prodata).forEach(columnName => {
                ws.cell(rowIndex2, columnIndex2++)
                    .string(prodata[columnName])
            });
            rowIndex2++;
        });
        wb.write('invoiceData9.xlsx');
        res.json({
            status: "Success",
            statusCode: 200,
            message: "PDf data read successfully.",
            mydata
        })

    } catch (err) {

        console.log(err);
        res.status(400).json({
            status: "Error",
            statusCode: 400,
            message: "NOT able to read PDF",
            error: err,
        });

    }

}




