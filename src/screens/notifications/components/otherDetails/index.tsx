import { DatePicker, Divider, Form,  FormInstance, Select, Switch, } from "antd";
import UploadComponent from "components/upload";
import { useAPI } from "hooks/useApi";
import { User } from "interfaces/entity/user";
import moment from "moment";
import { FC } from "react";
import { getFinalStringForSearch } from "utils/string";

interface IProps {
    form: FormInstance
    isCampaign?: boolean
}  

const OtherDetails: FC<IProps> = ({form, isCampaign}) => {
    const userSelectionType = Form.useWatch('targetAudienceType', form)
    const trigger = Form.useWatch('trigger', form)
    const {data: res} = useAPI<{status: string; message: string; data: Array<User>}>('/b2b/v1/partner/users')    

    return (
        <>
            <Divider/>
            <Form.Item label={'User Selection'} name={'targetAudienceType'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    onSearch={(s) => {
                        console.log(s,'search');
                    }}
                    options={[
                        {
                            value: 'ALL',
                            label: 'All'
                        },
                        {
                            value: 'SPECIFIC_USERS',
                            label: 'Specifice Users',
                        },
                        {
                            value: 'UPLOAD',
                            label: 'Upload'
                        }                        
                    ]}
                />
            </Form.Item>
            {userSelectionType==='SPECIFIC_USERS' &&
                <Form.Item label={'Users'} name={'targetAudience'}>
                    <Select
                        mode="multiple"
                        allowClear
                        showSearch
                        placeholder="Select"
                        optionFilterProp="label"
                        onSearch={(s) => {console.log(s,'search')}}
                        options={(res?.data || []).map((i)=>({
                            value: (i.mobile || "").slice(2,12),
                            search: getFinalStringForSearch(['mobile', 'name', 'email',], i.mobile, i),
                            title: <p
                            style={{
                              margin: 0,
                              padding: 0,
                              fontSize: 13,
                              fontWeight: "bold",
                            }}
                          >
                            {(i.mobile || "").slice(2,12)}
                          </p>,
                          label: <>
                            <b>{(i.mobile || "").slice(2,12)}</b>
                            <br/>
                            <small>
                                {moment(i.createdAt).format("lll")}
                                {i.name?" | "+i.name:""}
                                {i.email ? " | "+ i.email:""}
                            </small>
                          </>

                        })) as any}
                        labelRender={(p) => <>{(p as any).title} </>}
                />
            </Form.Item>}
           
            {userSelectionType==='UPLOAD' &&
                <Form.Item name='csvUrl' label="Users">
                    <UploadComponent name={"csvUrl"} form={form} allowedTypes={['text/csv']}/>
                </Form.Item>
            }
            <Form.Item label={'Trigger'} name={'trigger'}>
                <Select
                    showSearch
                    placeholder="Select"
                    optionFilterProp="label"
                    onSearch={(s) => {
                        console.log(s,'search');
                    }}
                    options={[
                        {
                            value: 'immediate',
                            label: 'Immediate'
                        },
                        {
                            value: 'specific_time',
                            label: 'Specifice Time',
                        }                        
                    ]}
                />
            </Form.Item>
            {trigger ==='specific_time' && 
                <Form.Item name={'scheduleTime'}>
                    <DatePicker showTime/>
                </Form.Item>
            }
            {isCampaign ?<></>:<Form.Item name={'published'} label={'Published'}>
                <Switch />
            </Form.Item>}
        </>
        )
}

export default OtherDetails;