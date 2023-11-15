"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
const winCon = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]
export default function Home() {
  const [board, setBoard] = useState<{ [key: number]: string }>({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" })
  const [xturn, setXturn] = useState(true)
  const [result, setResult] = useState("");
  const [filled, setFilled] = useState(0);
  const handleClick = (pos: number): void => {
    if (!board[pos] && !result) {
      setBoard({ ...board, [pos]: xturn ? "X" : "O" })
      setFilled(filled + 1)
      setXturn(!xturn)
      if (filled === 8) setResult("DRAW");
    }
  }

  useEffect(() => {
    winCon.forEach(([a, b, c]) => {
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        setResult(`${board[a]} Won`)
      }
    })
  }, [xturn])


  const handleReset = () => {
    setBoard({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "" });
    setResult("")
    setFilled(0)
  }
  return (
    <div>
      <div className={`font-bold text-center ${result === "DRAW" ? "bg-yellow-400" : " bg-green-600"} m-2 rounded-md`}>{result}</div>
      <div className={"flex flex-col justify-center items-center mt-10 font-bold"}>
        <p> {xturn ? "X" : "O"} turn </p>
        <div className='grid grid-cols-3 gap-1 w-fit m-auto p-3 select-none'>
          {
            Object.keys(board).map((idx: string) => {
              return <div key={idx} onClick={() => handleClick(parseInt(idx))} className='cursor-pointer border-black border-2 w-14 h-14 flex justify-center items-center font-bold hover:bg-slate-100'>{board[Number(idx)]}</div>
            })
          }
        </div>
        <button onClick={handleReset} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto"> Reset </button>
      </div>
    </div >
  )
}
