import React, { useState } from 'react'
import { useDocumentOperation } from '@sanity/react-hooks'
import { BsCollectionPlay } from 'react-icons/bs'

export function StartTranscodeAction(props) {
    const { id, type, published, draft, onComplete } = props
    const [isDialogOpen, setDialogOpen] = useState(false)

    console.log(props)
    // if( (type !== 'content') || (published?.status !== 'ingested') ) {
    //     return null
    // }
    if(type !== 'video') {
        return null
    }

    // return {
    //     label: `Edit title`,
    //     onHandle: () => {
    //       setDialogOpen(true)
    //     },
    //     dialog: isDialogOpen && {
    //       type: 'modal',
    //       onClose: () => {
    //         setDialogOpen(false)
    //       },
    //       content: (
    //         <>
    //           <h2>Edit title field</h2>
    //           <input
    //             type="text"
    //             value="hello"
    //             onChange={event =>
    //              patch.execute([
    //                               {set: {'title': event.currentTarget.value}}
    //               ])}
    //           />
    //           <button onClick={() => setDialogOpen(false)}>Done</button>
    //         </>
    //       )
    //     }
    // }

    return {
        label: "Transcode video",
        icon: BsCollectionPlay,
        onHandle: () => {
            setDialogOpen(true)
        },
        dialog: isDialogOpen && {
            type: 'confirm',
            onCancel: onComplete,
            onConfirm: async () => {
                onComplete()
                const { source } = published
                try {
                    const response = await fetch('https://kkuqsg0583.execute-api.ap-southeast-2.amazonaws.com/v1/PremieresVideoQueueTranscode', {
                        method: 'POST',
                        headers:  {
                            'x-api-key': 'GCPe3bkMS1alyp9jii5RI1sDhcKLhxo7ha8NReG2'
                        },
                        body: JSON.stringify({
                            videoId: id,
                            region: 'ap-southeast-2',
                            bucket: source.bucket,
                            key: source.key,
                            channels: 2,
                            adjustCrf: "-5"
                        })
                    })
                    if(!response.ok) {
                        alert(`Failed to start transcode: [${res.status}] ${res.statusText}`)
                    } else {
                        alert('Transcode requested')
                    }
                } catch(error) {
                    console.log(error)
                    alert(`Error! Check the console for more information.`)
                }
            },
            message: 'Are you sure you want to transcode this video?'
          }
    }
}