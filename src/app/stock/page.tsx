"use client";

import { useEffect, useState } from "react";
import { database } from "./../../../lib/firebase";
import { ref, push, onValue } from "firebase/database";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import { FaBlogger } from "@react-icons/all-files/fa/FaBlogger";
import { FaAllergies } from "@react-icons/all-files/fa/FaAllergies";
export default function Stock() {
  const [partNo, setPartNo] = useState("");
  const [code, setCode] = useState("");
  const [coilBox, setCoilBox] = useState(0);
  const [stockMH, setStockMH] = useState(0);
  const [stockDHL, setStockDHL] = useState(0);
  const [DHLR, setDHLR] = useState(0);
  const [DHLS, setDHLS] = useState(0);
  const [order, setOrder] = useState(0);

  const [dialog, setDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(0);
  const [data, setData] = useState([]);

  const openDialog = (type: number) => {
    setActionDialog(type);
    setDialog(true);
  };
  const productRef = ref(database, "stock");
  useEffect(() => {
    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      let tmp: any = Object.values(data);
      setData(tmp);
    });
  }, []);

  const actionSave = async () => {
    const productRef = ref(database, "stock");
    try {
      await push(productRef, {
        part_no: partNo,
        code: code,
        coil_box: coilBox,
        data: {
          Stock_MH: stockMH,
          Stock_DHL: stockDHL,
          DHL_r: DHLR,
          DHL_s: DHLS,
          to_order: order,
        },
        update: new Date().toISOString(),
      });

      setPartNo("");
      setCode("");
      setCoilBox(0);
      setStockDHL(0);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <div className="page">
          {dialog && (
            <>
              <div className="bg-gray-100 shadow-xl block absolute w-[400px] pb-6 mt-20 ml-40 rounded-xl">
                <h3 className="text-2xl text-center mt-10">
                    {
                        ["WithDraw DHL","Add DHL","To Order"][actionDialog-1]
                    }
                </h3>
                <input
                  type="number"
                  className="border-2 border-zinc-600 w-5/6 m-auto block mt-6"
                  placeholder="amount"
                />

                <button
                  className="submit w-5/6 h-[40px] block m-auto mt-6"
                  onClick={() => actionSave()}
                >
                  save
                </button>
                <button
                  className="w-5/6 h-[40px] block m-auto mt-2 cursor-pointer"
                  onClick={() => setDialog(false)}
                >
                  cancel
                </button>
              </div>
            </>
          )}
          <div className="container-action">
            <div className="title">
              <h3>DATA</h3>
            </div>
            <hr />
            <div className="input-adder">
              <input
                type="text"
                name=""
                id=""
                placeholder="part no"
                value={partNo}
                onChange={(e) => setPartNo(e.target.value)}
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <input
                type="number"
                name=""
                id=""
                placeholder="coil box"
                value={coilBox}
                onChange={(e) => setCoilBox(parseInt(e.target.value))}
              />
            </div>
            <div className="title">
              <h3>INFO</h3>
            </div>
            <hr />
            <div className="group-info">
              <input
                type="text"
                name=""
                id=""
                placeholder="stock MH"
                value={stockMH}
                onChange={(e) => setStockMH(parseInt(e.target.value))}
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="stock DHL"
                value={stockDHL}
                onChange={(e) => setStockDHL(parseInt(e.target.value))}
              />
              <button className="submit" onClick={() => actionSave()}>
                save
              </button>
            </div>
          </div>
          <div>
            <div className="mt-10 shadow-xl rounded-xl">
              <div className="grid grid-cols-6 font-bold border-b-1 pb-2 mb-2 text-center border-gray-200">
                <div>Part no</div>
                <div>Code</div>
                <div>Coil box</div>
                <div>Stock MH</div>
                <div>Stock DHL</div>
                <div></div>
              </div>
              {data.map((item) => (
                <>
                  <div className="grid grid-cols-6 pl-4 text-right pr-10">
                    <div>{item["part_no"]}</div>
                    <div>{item["code"]}</div>
                    <div>{item["coil_box"]}</div>
                    <div>{item["data"]["Stock_MH"]}</div>
                    <div>{item["data"]["Stock_DHL"]}</div>
                    <div className="grid grid-cols-3 text-center pl-10">
                      <button
                        onClick={() => openDialog(1)}
                        className="cursor-pointer"
                      >
                        <FaBeer />
                      </button>
                      <button
                        onClick={() => openDialog(2)}
                        className="cursor-pointer"
                      >
                        <FaBlogger />
                      </button>
                      <button
                        onClick={() => openDialog(3)}
                        className="cursor-pointer"
                      >
                        <FaAllergies />
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
