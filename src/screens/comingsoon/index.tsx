import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ComingSoon: React.FC = () => {
    const navigate = useNavigate()

    return(
        <Result
            status="500"
            title="coming soon"
            subTitle="this page is coming soon."
            extra={<Button type="primary" onClick={()=>{navigate('/')}}>back home</Button>}
        />
)};

export default ComingSoon;