import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const ComingSoon: React.FC = () => {
    const navigate = useNavigate()

    return(
        <Result
            status="500"
            title="Coming Soon"
            subTitle="Sorry, this page is coming soon."
            extra={<Button type="primary" onClick={()=>{navigate('/')}}>Back Home</Button>}
        />
)};

export default ComingSoon;