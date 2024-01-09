import { useState } from "react"

const Form = () => {
    const [isChecked, setIsChecked] = useState(false)
    const [isHover, setIsHover] = useState(false)

    return (
        <div className="mt-5 my-4 gap-2 d-flex align-items-center justify-content-center">
            <input onChange={(e) => setIsChecked(e.target.checked)} id="terms" type="checkbox" />

            <div className="terms-box">
                <p style={{ visibility: isHover ? "visible" : "hidden " }}> Size gerçekten bir şey teslim etmeyeceğiz.</p>
                <label htmlFor="terms">I read terms, terms are accepted.</label>
            </div>
            <button onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} disabled={!isChecked} type="button" className="btn btn-primary">Order</button>
        </div >
    )
}

export default Form