import React, {useState} from "react";
import {map} from "lodash";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowTrendUp,
    faBoxes,
    faBrain,
    faChartSimple,
    faCompass,
    faCookieBite,
    faDollyBox,
    faFire,
    faFlask,
    faGears,
    faHandsAslInterpreting,
    faIndustry,
    faLeaf,
    faMagnifyingGlassChart,
    faMicrochip,
    faMoneyCheckDollar,
    faSackDollar,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {Disclosure} from "@headlessui/react";
import {size} from "lodash/collection";

const Sidebar = () => {
    const menus = [{
        name: "Acopio", link: '/collection', icon: faLeaf, submenus: [{
            name: "Parcelas", link: "/collection/parcels", icon: faCompass
        },]
    }, {
        name: "Logística",
        link: "/logistic",
        icon: faDollyBox,
        submenus: [{name: "Movimiento de jabas", link: "/logistic/motion", icon: faBoxes}, {
            name: "Stock MP", link: "/logistic/stock", icon: faArrowTrendUp
        }]
    }, {
        name: "Producción", link: "/production", icon: faIndustry, submenus: [{
            name: "Acondicionado", link: "/production/process", icon: faHandsAslInterpreting
        }, {
            name: "MOD", link: "/production/mod", icon: faSackDollar
        }, {
            name: "Hornos", link: "/production/ovens", icon: faFire
        }]
    }, {
        name: "Calidad",
        link: "/quality-assurance",
        icon: faMagnifyingGlassChart,
        submenus: [{name: "Análisis", link: "/quality-assurance/analysis", icon: faFlask},]
    }, {
        name: "Comercial",
        link: "/sales",
        icon: faMoneyCheckDollar,
        margin: true,
        submenus: [{name: "Muestras", link: "/sales/samples", icon: faCookieBite},]
    }, {
        name: "Planificación",
        link: "/planning",
        icon: faBrain,
        margin: false,
        submenus: [{name: "S&OP", link: "/planning", icon: faMicrochip}, {
            name: "KPI",
            link: "/planning/kpi",
            icon: faChartSimple
        }

        ]
    }, {
        name: "Configuración",
        link: "/settings",
        icon: faGears,
        margin: true,
        submenus: [{name: "Usuarios", link: "/settings/users", icon: faUsers}]
    }];
    const [openSidebar, setOpen] = useState(false);
    return (<div
        className={`bg-white bg-opacity-10    ${openSidebar ? "w-72" : "w-16"} scrollbar-hide max-h-screen overflow-y-scroll scrollbar-hide duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
            <svg onClick={() => setOpen(!openSidebar)}
                 stroke="currentColor" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth={1.5} className="cursor-pointer w-6 h-6 text-gray-700">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
            </svg>

        </div>
        <div className="mt-4 flex flex-col gap-4 relative z-100">
            <NavLink to="/">
                <svg style={{
                    transitionDelay: `300ms`,
                }}
                     className={`cursor-pointer flex  duration-500 rotate-[360deg] ${!openSidebar && "hidden  duration-500 opacity-0 translate-x-28 overflow-hidden"}`}
                     width="100%" height="55" viewBox="0 0 181 66" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M66.3598 16.6183V48.3457C66.3598 48.3792 66.3598 48.3792 66.3598 48.4128V49.0843C66.3598 49.1514 66.3598 49.2522 66.3598 49.3193C66.3598 55.2619 63.2038 60.4659 58.5035 63.3868C58.4027 63.454 58.2684 63.5211 58.1677 63.5883C57.9327 63.7226 57.7313 63.8568 57.4962 63.9576C57.1605 64.1254 56.8248 64.2933 56.489 64.4612C56.4555 64.4612 56.4219 64.4948 56.3883 64.4948C56.1533 64.5955 55.9518 64.6626 55.7168 64.7634C55.2468 64.9648 54.7432 65.0991 54.2396 65.267C53.971 65.3341 53.736 65.4013 53.4674 65.4684C52.5609 65.6698 51.6208 65.8041 50.6807 65.8377H42.5558C42.4551 65.267 42.388 64.6626 42.3208 64.0583C42.2537 63.2525 42.2201 62.4132 42.2201 61.5738C42.2201 61.4059 42.2201 61.2381 42.2201 61.0702C42.2537 60.0294 42.3208 58.9886 42.4551 57.9814C42.4551 57.9478 42.4551 57.8807 42.4887 57.8471C42.858 55.3291 43.563 52.9453 44.5703 50.6958C44.5703 50.6623 44.6038 50.6287 44.6038 50.6287V50.5951C44.7046 50.4273 44.906 50.293 45.141 50.293C45.1746 50.293 45.2082 50.293 45.2753 50.293C45.3089 50.293 45.3089 50.293 45.3425 50.293C45.376 50.293 45.376 50.293 45.4096 50.293C46.1147 50.4944 46.8533 50.5951 47.6255 50.5951C50.7815 50.5951 53.5009 48.8829 54.9782 46.3312V46.2977C55.1461 45.9955 55.2804 45.7269 55.4147 45.4247C56.5562 43.0074 57.2948 40.3551 57.597 37.5684C57.6977 36.7626 57.7313 35.9569 57.7313 35.1511C57.7313 35.0504 57.7313 34.9832 57.7313 34.8825C57.7313 34.8489 57.7313 34.8154 57.7313 34.7818C57.7313 34.6139 57.7313 34.446 57.7313 34.3117C57.6977 33.3045 57.6305 32.2973 57.4962 31.3237C57.2948 29.9136 56.9926 28.5706 56.5562 27.2612C56.5562 27.2276 56.5226 27.1941 56.5226 27.1605C56.5226 27.1269 56.489 27.0933 56.489 27.0598C56.4219 26.8919 56.2204 26.7576 56.019 26.7576C55.8176 26.7576 55.6497 26.8583 55.549 27.0262C54.206 29.5778 52.0573 31.6594 49.4385 32.8345C49.1363 32.9688 48.8677 33.1031 48.5656 33.2038C47.9277 33.4388 47.2562 33.6403 46.5511 33.7746H46.5176C46.4168 33.7746 46.3497 33.8081 46.249 33.8081C46.1818 33.8081 46.1147 33.8417 46.0475 33.8417C42.2872 34.5803 39.3999 37.837 39.2656 41.7652C39.2656 41.8995 39.2656 42.0002 39.2656 42.1345C39.2656 42.2016 39.2656 42.3024 39.2656 42.3695C39.2656 42.4366 39.2656 42.5374 39.2656 42.6045C39.2656 42.7388 39.2992 42.9067 39.2992 43.041C39.3999 44.0146 39.6685 44.9547 40.0714 45.8276C40.3064 46.3312 40.6085 46.8348 40.9779 47.3049C40.9779 47.3049 40.9779 47.3384 41.0114 47.3384C41.0114 47.3384 41.0114 47.3385 41.0114 47.372C41.045 47.4056 41.0786 47.4392 41.1122 47.4392C41.1793 47.4727 41.2464 47.5063 41.3472 47.5063C41.4815 47.5063 41.5822 47.4392 41.6829 47.372C41.7501 47.3049 41.7836 47.2377 41.7836 47.137C42.0858 46.4991 42.4215 45.8948 42.7908 45.324C43.8988 43.5446 45.2417 41.9666 46.7526 40.5901C46.7861 40.5565 46.8197 40.5229 46.8197 40.5229C46.9204 40.4558 47.0212 40.4222 47.1219 40.4222C47.2562 40.4222 47.3905 40.4894 47.4912 40.5565C47.4912 40.5565 47.4912 40.5565 47.5248 40.5565C47.6255 40.6572 47.6926 40.7915 47.6926 40.9258C47.6926 41.0601 47.6591 41.1608 47.5584 41.2616L47.5248 41.2951C46.6183 42.3024 45.7789 43.3767 45.0403 44.5518C44.1338 45.9283 43.3616 47.4056 42.7573 48.95C41.9851 50.8637 41.4479 52.8782 41.1457 54.9597C41.1457 55.094 41.1122 55.1948 41.1122 55.3291C41.1122 55.3626 41.1122 55.3962 41.0786 55.4634C41.0114 55.6648 40.8436 55.7991 40.6085 55.7991C40.4742 55.7991 40.34 55.7319 40.2728 55.6648C40.2392 55.5976 40.2057 55.5305 40.1721 55.4969C40.0042 55.1948 39.8028 54.9262 39.6013 54.6576C39.2656 54.154 38.8627 53.6839 38.4598 53.2139C38.4262 53.1803 38.3591 53.1132 38.3255 53.0796C37.8555 52.576 37.3854 52.106 36.8483 51.6695C36.8483 51.6695 36.8147 51.6359 36.7811 51.6359C36.7811 51.6359 36.7811 51.6359 36.7475 51.6023C36.6468 51.5016 36.5797 51.3673 36.5797 51.233C36.5797 50.9309 36.8147 50.6958 37.1168 50.6958C37.2176 50.6958 37.3183 50.7294 37.419 50.7966C37.4526 50.8301 37.4862 50.8301 37.4862 50.8637C37.8219 51.1323 38.1241 51.4009 38.4262 51.6695C38.4262 51.6695 38.4262 51.6695 38.4598 51.6695C38.527 51.7366 38.5941 51.7366 38.6613 51.7366C38.7955 51.7366 38.8963 51.6695 38.9634 51.5352V51.5016V51.468C39.0306 51.1323 39.0977 50.763 39.0977 50.3601C39.0977 48.2449 37.7548 46.432 35.8746 45.7605C35.8075 45.7269 35.7403 45.7269 35.7067 45.6933C35.2703 45.559 34.8338 45.4583 34.3302 45.4583C34.1959 45.4247 34.0616 45.3912 33.8937 45.3576C33.7259 45.324 33.558 45.2904 33.3901 45.2233C31.9129 44.854 30.5363 44.2832 29.227 43.5782C29.227 43.5782 29.1934 43.5782 29.1934 43.5446C29.1598 43.511 29.0927 43.511 29.0255 43.511C28.7905 43.511 28.6226 43.6789 28.6226 43.9139C28.6226 43.9475 28.6226 43.9811 28.6226 43.9811C28.6898 44.7868 28.7905 45.5926 28.9584 46.3648C29.0255 46.6334 29.0927 46.9356 29.1598 47.2042C29.2605 47.5735 29.3613 47.9428 29.462 48.3121C29.4956 48.4128 29.5291 48.5471 29.5627 48.6478C29.9656 49.8229 30.4692 50.9309 31.0735 52.0052C31.2078 52.2738 31.3421 52.5088 31.51 52.7439C31.51 52.7439 31.51 52.7439 31.51 52.7774C31.9465 53.3482 32.4836 53.8182 33.1215 54.1204C33.4573 54.2883 33.8266 54.4226 34.2295 54.4897C34.4981 54.5569 34.8002 54.5904 35.1024 54.5904C35.7403 54.5904 36.3111 54.4561 36.8483 54.2211C36.8818 54.2211 36.8818 54.2211 36.9154 54.1875C36.9826 54.154 37.0497 54.154 37.1504 54.154C37.184 54.154 37.184 54.154 37.2176 54.154C37.3854 54.154 37.5533 54.2547 37.654 54.389C37.6876 54.4226 37.6876 54.4897 37.7212 54.5233C38.4262 55.8662 38.997 57.3099 39.3663 58.8208C39.467 59.1901 39.5342 59.5594 39.6013 59.8951C39.7356 60.7009 39.8363 61.5067 39.8699 62.3124C39.8699 62.6146 39.9035 62.8832 39.9035 63.1854C39.9035 64.0247 39.8363 64.8641 39.7356 65.7034H16.2003C14.7566 65.6027 13.3465 65.3341 12.0035 64.8976C11.4999 64.7298 10.9963 64.5283 10.5263 64.3269C7.6389 63.0511 5.15442 60.9359 3.44215 58.3171C1.86417 55.967 0.890526 53.2139 0.722656 50.2258V15.4767C1.22627 7.0161 8.14251 0.267733 16.6703 0.0327148H50.9158C59.5443 0.637046 66.3598 7.82188 66.3598 16.6183Z"
                        fill="#22c55e"></path>
                    <path
                        d="M179.94 25.885C179.067 23.5348 178.127 24.5756 178.127 24.5756C176.684 27.1943 175.844 27.9665 173.427 27.7987C167.854 27.4629 168.559 12.7911 168.525 10.7767C168.492 8.76223 167.149 6.4792 165.705 5.77415C164.228 5.06909 161.978 4.76693 160.232 7.31855C158.487 9.87017 157.177 20.4124 156.439 21.0839C155.666 21.7889 155.532 20.2445 155.532 20.2445C155.532 20.2445 154.76 12.8583 154.29 10.7767C153.82 8.69508 153.115 5.90844 150.16 5.37126C147.206 4.8005 148.918 8.35934 148.918 8.35934C149.254 11.4146 148.213 16.3499 147.542 19.9088C146.836 23.4676 142.908 28.2687 139.752 28.7387C136.563 29.2424 136.126 25.4149 136.126 25.4149C142.371 19.0359 143.21 14.7384 143.21 14.7384C145.896 4.0283 138.51 4.43119 138.51 4.43119C138.51 4.43119 134.381 4.09545 131.594 10.6759C128.841 17.29 130.553 23.5348 130.553 23.5348C130.553 23.5348 129.042 26.7243 125.718 26.5229C122.395 26.3214 120.682 18.868 120.481 16.8536C120.279 14.8391 121.387 14.9734 121.387 14.9734C122.16 15.3763 123.939 15.6785 123.939 15.6785C123.939 15.6785 128.572 16.3164 130.083 9.76945C131.594 3.22252 129.009 1.34238 128.001 0.738048C127.028 0.100142 124.409 -0.571337 122.327 0.805196C120.212 2.24888 118.299 6.57992 117.862 7.51999C117.426 8.46006 116.754 7.72144 116.754 7.72144C116.754 7.72144 115.042 5.63985 111.718 5.20339C108.394 4.8005 107.857 7.28497 107.857 7.28497C107.857 7.28497 107.857 8.96367 106.481 9.23226C105.104 9.50086 105.104 10.911 105.104 10.911C105.104 10.911 105.305 16.3164 105.775 21.4868C104.97 23.0647 103.694 24.307 102.653 25.1128C102.25 19.8081 101.982 14.8727 102.15 11.7503C102.15 11.7503 102.687 3.69256 101.277 3.28967C99.8665 2.92036 98.8257 3.02108 98.4228 3.2561C98.0199 3.49111 97.8185 3.86043 97.5834 3.69256C97.2141 3.45754 97.382 3.55826 97.0127 3.32324C97.0127 3.32324 91.1037 -0.50419 84.4896 14.2348C77.8755 28.9738 90.0293 29.0073 90.0293 29.0073C90.0293 29.0073 93.9575 28.9738 96.3748 26.355C98.4564 24.1391 97.9192 27.2951 97.7513 27.8323C97.4156 28.9738 97.4492 28.5709 94.7297 30.8539C94.7297 30.8539 80.595 41.2618 82.1394 49.6218C83.5159 57.1088 88.317 59.7275 94.6961 59.3918C99.7993 59.1232 105.171 55.5979 104.802 49.3196C104.634 46.3651 103.929 39.751 103.291 32.7005C104.5 31.5925 105.809 30.1824 106.749 29.0409C107.991 33.6741 111.953 31.9954 112.155 31.6597C112.356 31.3239 112.02 30.1824 111.685 29.3767C111.349 28.5373 110.509 13.664 111.953 10.6759C111.953 10.6759 112.591 8.22505 113.397 9.13154C114.236 10.038 115.68 11.4146 115.68 11.4146C115.68 11.4146 116.217 11.7503 116.217 12.3882C116.217 13.0261 114.203 21.5875 120.246 26.9258C126.289 32.264 131.896 28.7052 131.896 28.7052C131.896 28.7052 132.668 27.8322 133.608 28.7387C134.582 29.6452 138.51 33.372 144.117 31.1561C149.724 28.9402 150.765 23.2662 150.765 23.2662C150.765 23.2662 151.369 22.259 152.074 23.5684C152.779 24.8777 154.29 27.9665 157.446 27.9665C160.635 27.9665 160.132 25.7507 160.132 25.7507C160.132 25.7507 161.441 15.0406 162.28 13.429C163.12 11.8175 163.59 14.4027 163.59 15.0406C163.59 15.6785 164.799 30.2496 172.856 31.8611C174.636 32.2304 176.482 32.2304 179.705 28.9738C179.705 28.9738 180.813 28.2351 179.94 25.885ZM123.469 6.24418C124.879 4.06187 125.45 4.49833 125.45 4.49833C126.188 4.96837 125.584 6.94923 125.181 8.0236C124.812 9.09797 122.227 12.7911 121.723 11.5824C121.186 10.4074 122.059 8.46006 123.469 6.24418ZM95.9383 16.5514C94.9647 19.338 88.3842 28.7387 87.0412 25.6835C85.7318 22.6283 87.9477 17.6258 91.5401 11.9853C95.1325 6.3449 96.5762 7.51999 96.5762 7.51999C98.5235 8.72865 96.912 13.7983 95.9383 16.5514ZM92.178 55.9337C87.9813 55.4972 85.8997 49.9575 88.3842 44.955C90.8687 39.9525 98.1206 34.6478 98.1206 34.6478C98.6578 34.2449 98.6578 35.1178 98.6578 35.1178C98.6578 35.1178 99.6315 40.8254 99.7658 48.0438C99.9336 55.3293 95.5019 56.303 92.178 55.9337ZM134.414 18.9016C133.508 17.1557 134.582 14.1341 136.462 10.6424C138.342 7.18425 139.215 7.82216 139.215 7.82216C140.39 8.46006 139.685 11.4817 139.215 13.1604C138.779 14.8055 135.321 20.6138 134.414 18.9016Z"
                        fill="#22c55e"></path>
                    <path
                        d="M173.259 55.6985C173.259 55.6985 170.674 54.6913 167.787 50.7296C165.806 48.0101 166.947 46.5328 166.947 46.5328C166.947 46.5328 171.95 38.9451 172.789 38.3072C173.393 37.8371 175.274 35.7891 172.42 34.8155C169.566 33.8418 168.861 35.6548 168.458 36.2256C166.141 39.2808 164.933 42.7389 163.892 42.9404C162.851 43.1418 162.583 41.396 162.314 40.4223C162.146 39.818 160.568 33.909 157.748 34.7148C154.156 35.722 155.633 36.9978 155.901 37.3671C156.439 38.1393 156.439 38.3408 156.606 39.3815C156.64 39.5494 156.204 39.8516 156.069 40.0195C155.398 40.7245 153.182 42.1346 152.544 42.5039C152.477 42.4368 152.443 42.3361 152.376 42.2689C151.268 40.8924 149.522 39.7173 146.904 39.4151C141.834 38.8444 139.819 41.4967 138.107 42.6047C136.361 43.7126 132.769 42.4704 131.527 41.6982C123.771 36.9642 122.025 41.5639 121.958 43.0747C121.925 44.0148 122.16 44.6191 122.932 45.3913C123.838 46.2978 125.584 46.1299 128.606 45.6263C130.217 45.3577 132.332 59.1566 124.577 59.6938C118.332 60.1638 118.903 54.6913 118.903 54.6913C118.903 54.6913 122.797 28.8057 119.104 27.4292C115.445 26.0527 114.538 28.6715 114.538 28.6715C112.524 34.144 116.016 48.8494 114.135 54.8256C112.524 60.0631 106.883 58.3508 109.301 62.4133C110.778 64.8978 114.605 63.7898 116.553 61.4732C116.553 61.4732 120.514 65.1328 127.028 63.4541C133.541 61.7754 133.978 54.3891 134.045 51.8711C134.112 49.353 133.004 46.0963 133.004 46.0963C133.004 46.0963 135.22 46.9693 136.899 46.7343C136.899 46.7343 132.03 59.2909 141.599 63.0176C144.016 63.9577 151.94 65.5021 154.726 55.5306C155.297 53.4826 155.834 50.5281 154.391 46.0292C156.036 45.3913 158.554 43.4776 158.554 43.4776C158.554 43.4776 159.225 45.1227 160.065 46.7678C160.635 47.9429 160.3 48.7487 160.3 48.7487C160.3 48.7487 155.801 57.8808 155.801 61.7082C155.801 65.5357 158.05 65.3007 159.393 65.8043C159.897 65.9721 161.105 65.6028 161.038 63.4205C160.971 61.2382 162.885 55.7657 163.053 55.1949C163.221 54.6241 163.59 53.0462 165.034 54.8927C166.914 57.2765 169.935 59.5595 170.741 59.6938C171.58 59.8281 171.95 59.3581 173.125 57.9815C174.266 56.6721 173.259 55.6985 173.259 55.6985ZM142.875 43.6454C143.848 43.0411 144.352 42.3025 146.635 42.3025C148.918 42.3025 149.489 43.7462 149.489 43.7462C149.455 44.4848 147.474 44.9884 146.434 44.9548C145.023 44.9884 142.17 44.1155 142.875 43.6454ZM151.973 53.9527C151.369 56.84 149.119 59.996 145.091 59.6267C140.659 59.2238 139.584 55.0942 139.887 52.2404C140.189 49.5545 141.062 47.7079 141.062 47.7079C141.062 47.7079 146.131 50.8974 151.537 48.0772C151.537 48.0436 152.578 51.0653 151.973 53.9527Z"
                        fill="#22c55e"></path>
                </svg>
            </NavLink>

            {menus?.map((menu, i) => (<Disclosure key={i}>
                {({open}) => (<>
                    <Disclosure.Button onClick={() => {
                        !openSidebar && setOpen(true)
                    }}
                                       className={` ${menu?.margin && "mt-5"}  group flex items-center text-sm text-gray-700 hover:text-green-400  gap-3.5 font-medium p-2 hover:bg-gray-400 hover:bg-opacity-10 rounded-full ${open && size(menu.submenus) > 0 && 'bg-green-500 bg-opacity-10'}`}>
                        <div><FontAwesomeIcon className={"text-gray-400 bg-white rounded-full hover:text-green-400"}
                                              icon={menu?.icon}/>
                        </div>
                        <h2
                            className={`whitespace-pre duration-500 ${!openSidebar && "opacity-0 translate-x-28 overflow-hidden"}`}>
                            {menu?.name}
                        </h2>
                        <h2 className={`${openSidebar && "hidden"} z-50    absolute left-48 bg-white font-semibold whitespace-pre text-green-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>
                            {menu?.name}
                        </h2>
                    </Disclosure.Button>
                    {map(menu?.submenus, (submenu, id) => (<Disclosure.Panel
                        key={id}
                        className={` ${openSidebar ? "opacity-100 translate-x-0 ml-4" : "ml-2"}  duration-500 overflow-hidden whitespace-pre flex flex-col gap-2.5 text-sm text-gray-500`}>
                        <NavLink to={`${submenu.link}`}
                                 className={` ${submenu?.margin && "mt-5"} group flex items-center text-sm text-gray-700 hover:text-green-400  gap-3.5 font-medium p-2 hover:bg-gray-400 hover:bg-opacity-10 rounded-full`}>
                            <div><FontAwesomeIcon className={"text-gray-400 bg-white rounded-full hover:text-green-400"}
                                                  icon={submenu?.icon}/>
                            </div>
                            <h2
                                className={`whitespace-pre duration-500 ${!openSidebar && "opacity-0 translate-x-28 overflow-hidden"}`}>
                                {submenu?.name}
                            </h2>
                            <h2 className={`${openSidebar && "hidden"} z-50    absolute left-48 bg-white font-semibold whitespace-pre text-green-400 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>
                                {submenu?.name}
                            </h2>
                        </NavLink>
                    </Disclosure.Panel>))}
                </>)}
            </Disclosure>))}
        </div>
    </div>);
};


export default Sidebar;