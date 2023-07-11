import { useEffect } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../redux/slices/loaderSlice';
import { setUser } from '../redux/slices/userSlice';

function ProtectedViewPage({ children }) {

    const dispatch = useDispatch();
    const {user} = useSelector(state=> state.user)
    // const [user, setUser] = useState(null); Redux is handling the user state
    const navigate = useNavigate();

    const validateToken = async () => {

        try {
            dispatch(setLoader(true));
            const response = await GetCurrentUser();
            dispatch(setLoader(false));
            console.log("Response After getting GetCurrentuser():", response);
            if (response.status) {
                // setUser(response.data); Redux used
                dispatch(setUser(response.data));
            }
            else {
                navigate('/login')
                message.error(response.message);
            }

        } catch (error) {
            dispatch(setLoader(false));
            navigate('/login')
            message.error(error.message);
        }

    }



    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        }
        else {
            message.error("Please login to continue");
            navigate('/login');  
        }
    }, []);

    return (
        <div>
            {user && (
                <>
                <NavBar user = {user} />
                <div className='p-5'>
                    {console.log(user)}
                    {user.fullName}
                    {children}
                </div>
                </>
            )}
        </div>
    );
}

export default ProtectedViewPage
