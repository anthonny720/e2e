import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
const MySwal = withReactContent(Swal)

export {MySwal}
export default generateRandomColor;