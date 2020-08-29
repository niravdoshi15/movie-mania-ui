import React from "react";
import { useHistory, useLocation } from 'react-router'
import { MovieContext } from '../store'

export default () => {
    let history = useHistory()
    let location = useLocation()

    const { isLogin, setValue } = React.useContext(MovieContext)

    const onClickButton = (e) => {
        if (e.target.value === 'login') {
            history.push('./login')
        } else {
            localStorage.clear('token')
            setValue('IsLogin', '')
            history.push('./')
        }
    }

    const handleAddClick = (e) => {
        history.push('./add')
    }

    return (
        <div style={{ backgroundColor: 'lightblue', padding: '30px' }}>
            <h2 style={{ fontSize: '30px', color: 'white' }}>Movie Mania</h2>
            {isLogin !== '' && location.pathname === '/' ?
                <button style={{ marginLeft: '45%', textAlign: 'center', marginTop: '-5%' }} className='btn btn-info' onClick={handleAddClick}>Add Movie</button>
                : null}
            <button style={{ float: 'right', marginTop: '-2.5%' }} className='btn btn-primary' value={isLogin !== '' ? 'logout' : 'login'} onClick={onClickButton}>{isLogin !== '' ? 'Logout' : 'Login'}</button>
        </div>
    )
}