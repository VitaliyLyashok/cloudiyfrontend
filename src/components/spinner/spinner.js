import './spinner.css'

const Spinner = () => {
    return (
        <div className='spinner-center'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner