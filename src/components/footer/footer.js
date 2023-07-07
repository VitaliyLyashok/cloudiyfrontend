import styles from './footer.css'
import { memo } from 'react'
const Footer = () => {
    console.log('footer')
    return(
    <div className="footer">
        <div className="copyright">Copyright © 2022 <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley'>Cloudiy</a></div>
    </div>
    )
}

export default memo(Footer)