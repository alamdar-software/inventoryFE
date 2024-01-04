import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import "./printStyles.css";

function PrintCipl() {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getCipl = async () => {
      const res = await fetch(`http://localhost:8080/cipl/createpdf/${id}`);

      const data = await res.json();
      setdata(data);

      console.log(data, "backdata");

      /* setdata(data); */
    };
    getCipl();
  }, []);

  const [transferItem, settransferItem] = useState();
  const [sourceLocation, setsourceLocation] = useState();
  const handlePrint = () => {
    const printWindow = window.open();

    printWindow.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="./styles.css">
          <link rel="stylesheet" type="text/css" href="./printStyles.css" media="print" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </head>
        <body>
          ${document.getElementById("printableArea").innerHTML}
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for the content to be fully rendered before printing
    printWindow.onload = () => {
      // Apply additional styling for print
      const printStyles = printWindow.document.createElement("style");
      printStyles.innerHTML = `
  @media print {
    @page {
      margin: 0;
    }

    .col-md-4,
    .col-md-8,
    .col-md-3,
    .col-md-9,
    .col-md-5,
    .col-md-7 {
      display: inline-block !important;
      width: 48% !important; /* Adjust the width as needed */
      margin: 0 !important;
    }
  }
`;
      printWindow.document.head.appendChild(printStyles);

      printWindow.print();

      printWindow.onafterprint = () => {
        // Close the print window after printing is complete
        printWindow.close();
      };
    };
  };

  return (
    <>
      <div className="full_container print-cipl-container">
        <div className="inner_container">
          <div id="content">
            <div className="midde_cont">
              <div className="container-fluid" id="printableArea">
                <div className="row mt-3">
                  <div className="col-md-12 mt-4">
                    <div className="row">
                      <div className="col-md-8 d-flex align-items-center gap-2">
                        <img src="/logo/logo.jpg" />
                        <span>
                          <h3 className="text-uppercase text-bold">
                            <b>PT. Satrya Maritim Indonesia</b>
                          </h3>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <h5 className="mt-3">
                          <b className="text-uppercase">
                            {" "}
                            Commercial Invoice /packing list
                          </b>
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7 mt-2">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="mt-2">
                          <b className="text-uppercase">consignee:</b>
                        </h5>
                      </div>
                      <div className="col-md-9">
                        <h6 className="mt-2">
                          <b className="text-uppercase">{data.consigneeName}</b>
                          <br />
                          <b className="text-uppercase">{data.pickupAddress}</b>
                          <br />
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 mt-2">
                    <h6 className="mt-2">
                      <b className="text-uppercase">
                        {" "}
                        REF.NO :&nbsp;
                        <strong>{data.referenceNo}</strong>
                      </b>
                    </h6>

                    <h6 className="mt-2">
                      <b className="text-uppercase">
                        {" "}
                        Date :&nbsp;
                        <strong>{data.transferDate}</strong>
                      </b>
                    </h6>
                  </div>

                  <div className="col-md-7 mt-2">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="">
                          <b className="text-uppercase"> Shipper:</b>
                        </h5>
                      </div>
                      <div className="col-md-9">
                        <h6 className="">
                          <b className="text-uppercase">{data.shipperName}</b>
                          <br />
                          <b className="text-uppercase">{data.locationName}</b>
                          <br />
                        </h6>
                      </div>
                    </div>
                  </div>

                  {data.pickupAddress != null && (
                    <div className="col-md-5 mt-2">
                      <h6 className="mt-2">
                        <b className="text-uppercase">
                          Pickup Address:&nbsp;
                          <strong>{data.pickupAddress}</strong>
                        </b>
                      </h6>
                    </div>
                  )}

                  <div className="col-md-7 mt-2">
                    <div className="row">
                      <div className="col-md-3">
                        <h5 className="mt-2">
                          <b className="text-uppercase">
                            Location{" "}
                            <small>
                              <b>/</b>
                            </small>{" "}
                            Vessel:
                          </b>
                        </h5>
                      </div>
                      <div className="col-md-9">
                        <h6 className="mt-2">
                          <React.Fragment key={data.locationName}>
                            <b className="text-uppercase">
                              {data.locationName}
                            </b>
                            <br />
                          </React.Fragment>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5 mt-2">
                    {data.po != null && (
                      <h6 className="mt-2">
                        <b className="text-uppercase">
                          PO{" "}
                          <small>
                            <b>/</b>
                          </small>{" "}
                          SO Number <small>(For Repair)</small> :&nbsp;
                          <strong>{data.po}</strong>
                        </b>
                      </h6>
                    )}
                  </div>

                  <div className="col-md-12 table table-responsive">
                    <table className="table table-bordered mt-3 tbl">
                      <thead>
                        <tr>
                          <th className="font-weight-bold">S.No</th>
                          <th className="font-weight-bold">Qty</th>
                          <th className="font-weight-bold w-100">
                            Item Description
                          </th>
                          <th className="font-weight-bold ">
                            Part No/Serial No
                          </th>
                          <th className="font-weight-bold">HS CODE</th>
                          <th className="font-weight-bold">
                            COUNTRY OF ORIGIN
                          </th>
                          <th className="font-weight-bold">
                            DIMENSION
                            <br />
                            (CM)
                          </th>
                          <th className="font-weight-bold">
                            WEIGHT
                            <br />
                            (KG)
                          </th>
                          <th className="font-weight-bold">Unit Price</th>
                          <th className="font-weight-bold">Amount</th>
                        </tr>
                      </thead>
                      <tbody id="" className="tbody1">
                        {/* Use data.map() to render rows */}

                        <td className="font-weight-bold">{data.id}</td>

                        <td className="font-weight-bold">
                          <h6 className="mt-">
                            {data.quantity?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b className="text-capitalise">{value}</b>
                                {index < data.quantity.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </h6>
                        </td>

                        <td className="font-weight-bold">
                          <div
                            className="mt-"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {data.item?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  className="text-capitalise"
                                  style={{ marginBottom: "15px" }}
                                >
                                  {value}
                                </b>
                                {index < data.item?.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>

                        <td className="font-weight-bold">
                          <h6 className="mt-">
                            {data.partNo?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  style={{
                                    textTransform: "capitalize",
                                    fontSize: "0.80rem",
                                    paddingBottom: "50px !important",
                                  }}
                                >
                                  {value}
                                </b>
                                {index < data.partNo?.length - 1 && <br />}{" "}
                                {/* Add line break if it's not the last element */}
                              </React.Fragment>
                            ))}
                          </h6>
                        </td>

                        <td className="font-weight-bold">
                          <div
                            className="mt-"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {data.hs?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  className="text-capitalise"
                                  style={{ marginBottom: "15px" }}
                                >
                                  {value}
                                </b>
                                {index < data.hs?.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                        <td className="font-weight-bold">
                          <div
                            className="mt-"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {data.cor?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  className="text-capitalise"
                                  style={{ marginBottom: "15px" }}
                                >
                                  {value}
                                </b>
                                {index < data.cor?.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                        <td className="font-weight-bold">
                          <div
                            className="mt-"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {data.dimension?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  className="text-capitalise"
                                  style={{ marginBottom: "15px" }}
                                >
                                  {value}
                                </b>
                                {index < data.dimension?.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                        <td className="font-weight-bold">
                          <div
                            className="mt-"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {data.weights?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  className="text-capitalise"
                                  style={{ marginBottom: "15px" }}
                                >
                                  {value}
                                </b>
                                {index < data.weights?.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                        <td className="font-weight-bold">
                          <div
                            className="mt-"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {data.unitPrice?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  className="text-capitalise"
                                  style={{ marginBottom: "15px" }}
                                >
                                  {value}
                                </b>
                                {index < data.unitPrice?.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                        <td className="font-weight-bold">
                          <div
                            className="mt-"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {data.amount?.map((value, index) => (
                              <React.Fragment key={index}>
                                <b
                                  className="text-capitalise"
                                  style={{ marginBottom: "15px" }}
                                >
                                  {value}
                                </b>
                                {index < data.amount?.length - 1 && (
                                  <span className="quantity-gap" />
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                      </tbody>
                      <tr>
                        <td
                          colSpan="3"
                          className="font-weight-bold text-right text-uppercase"
                        >
                          Total Weight
                        </td>
                        <td colSpan="7" id="" className="font-weight-bold">
                          {data.totalWeight} Kg
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan="3"
                          className="font-weight-bold text-right text-uppercase"
                        >
                          Total Packages<span className="currency"></span>
                          <span className="totalPackages"></span>
                        </td>
                        <td colSpan="7" id="" className="font-weight-bold">
                          {data.totalPackage}
                        </td>
                      </tr>
                      <tr>
                        <th
                          colSpan="3"
                          className="font-weight-bold text-right text-uppercase"
                        >
                          Total amount<span className="currency"></span>
                          &nbsp;&nbsp;<span className="totalAmount"></span>
                        </th>
                        <th colSpan="7" id="" className="font-weight-bold">
                          <span className="currency">{data.currencyName} </span>
                          {data.totalAmount}
                        </th>
                      </tr>
                      <tr>
                        <th colSpan="3">
                          <h5 className="font-weight-bold ">
                            <b>Prepared By :</b>&nbsp;
                            <strong className="font-weight-normal">
                              shah Umer
                            </strong>
                            <br />
                            <b className="hidden">Contact No :</b>&nbsp;
                            <strong className="font-weight-normal">
                              123456789
                            </strong>
                          </h5>
                        </th>
                        <th colSpan="7">
                          <h6 className="">
                            <b>
                              Important Notice For Receiver <br /> Please
                              Sign/Stamp & Email This CIPL To:
                            </b>
                            &nbsp;
                            <strong className="text-lowercase">
                              <a
                                href={`mailto:${"shah.umer8493@gmail.com"}`}
                                style={{ color: "blue" }}
                              >
                                shah.umer8493@gmail.com
                              </a>
                            </strong>
                          </h6>
                          <h5 className="mt-4">
                            <b>Received By:</b> &nbsp;
                            <strong className="float-right"></strong>
                          </h5>
                        </th>
                      </tr>
                    </table>
                  </div>

                  <div className=" col-md-12 table table-responsive">
                    <table className="table table-borderless mt-4">
                      <h5>
                        <strong className=" font-weight-bold">
                          {" "}
                          PT. SATRYA MARITIM INDONESIA
                        </strong>
                      </h5>
                      <h6>
                        <strong className=" font-weight-bold">
                          {" "}
                          Horizon Industrial Park Type F Lot 3A, Sei Lekop, Kec.
                          Sagulung, Batam 29422, Indonesia
                        </strong>
                      </h6>

                      <h6>
                        <b>Phone No:</b>&nbsp;
                        <strong className=" font-weight-bold ml-5">
                          +62 778 6000 113
                        </strong>
                      </h6>
                      <h6>
                        <b>Tax ID Number:</b>&nbsp;&nbsp;
                        <strong className="font-weight-bold">
                          {" "}
                          62.086.146.8-225.000
                        </strong>
                      </h6>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row m-2">
                <div className="col-lg-12 ">
                  <button
                    className="btn-primary float-right"
                    id="printButton"
                    onClick={handlePrint}
                  >
                    <i className="fa fa-print" aria-hidden="true">
                      {" "}
                      Print
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrintCipl;
