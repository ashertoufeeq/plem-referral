import { Button, notification } from "antd";
import { Template } from "interfaces/entity/template";
import { useState } from "react";
import { toggleArchive as toggleArchiveService } from "interfaces/services/templates";


const useArchive = ({ onDone, allowToggle}:{ onDone: ()=> void, allowToggle?: boolean}) => {
    const [archiveLoading, setArchiveLoading] = useState(false);
    const [archiveId, setArchiveId] = useState('');
    
    const toggleArchive = async (template: Template) => {
            setArchiveLoading(true);
            setArchiveId(template.id);
            const {error} = await toggleArchiveService({id: template.id});
            setArchiveLoading(false)
            setArchiveId('');
            if(error){
                notification.error({   message: `Couldn't ${template?.archive? 'unarchive': 'archive'} template`, description: error?.message || 'Something went wrong' })
                return;
            }
            notification.success({   message: `Template ${template?.archive? 'unarchieved': 'archived'} successfully` })
            onDone()
        }

        const ArchiveButton = (record: Template) =><>
                {(record?.archive  || allowToggle) && <Button
                    size="small"
                    type="dashed"
                    disabled={archiveLoading && archiveId === record.id}
                    loading={archiveLoading && archiveId === record.id}
                    className="cursor-pointer mr-2"
                    onClick={() => toggleArchive(record)}
                    danger={!record?.archive}
>
                    {record?.archive?'Unarchive': 'Archive'}
                  </Button>}</>

        return {
            ArchiveButton,
            toggleArchive,
            archiveLoading,
            setArchiveLoading,
            archiveId,
            setArchiveId
        }
}
export default useArchive;