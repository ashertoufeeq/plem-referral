import { Button, Drawer, Form } from 'antd';
import * as React from 'react';
import OtherDetails from '../otherDetails';

interface IProps{
    toggle: () => void
    isOpen: boolean;
    onSubmit: (data:Record<string,any>) => void
    submitLoading: boolean
}

const OtherDetailsDrawer:React.FC<IProps> = ({toggle, isOpen, onSubmit, submitLoading}) => {
   
   const [form] = Form.useForm()

   return <>
        <Drawer
            title={"Other Details"}
            width={500}
            onClose={toggle}
            open={isOpen}
            styles={{ body: { padding: 0 } }}
            closable={false}
            footer={<>
                <div>
                    <div>
                        <Button type='dashed' onClick={toggle} className='mr-2'>
                            Cancel
                        </Button>
                        <Button disabled={submitLoading} loading={submitLoading} type='primary' onClick={()=>{form.submit()}}>
                            Send
                        </Button>
                    </div>
                </div>
            </>}
        >
            <div className="px-3" style={{ height: "100%" }}>
                <Form layout='vertical' form={form} onFinish={(data) => {
                    onSubmit(data);
                }}>
                    <br/>
                    <OtherDetails isCampaign form={form} />
                </Form>
            </div>
        </Drawer>
    </>
}

export default OtherDetailsDrawer;