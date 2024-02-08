
import React from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import PhoneInput from 'react-phone-input-2'

function NumberCom({ph,setPh,onSignup,loading}) {
  return (
    <>
        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
            <BsTelephoneFill size={30} />
        </div>
        <label
            htmlFor=""
            className="font-bold text-xl text-white text-center"
        >
            Verify your phone number
        </label>
        <PhoneInput country={"in"} value={ph} onChange={setPh} />
        <button
            onClick={onSignup}
            className= {
            `bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded
            ${
                ph.length === 12 && !loading
                ? 'bg-emerald-400 text-white cursor-pointer'
                : 'bg-emerald-600 text-white cursor-not-allowed'
            } `
            }
            disabled = { ph.length  !== 12 || loading }
        >
            {loading && (
            <CgSpinner size={20} className="mt-1 animate-spin" />
            )}
            <span>Send code via SMS</span>
        </button>
        </>
  )
}

export default NumberCom
