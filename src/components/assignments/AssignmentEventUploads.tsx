import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone'
import { DirectUploadProvider } from 'react-activestorage-provider'
import auth from '@/Auth'
import { AssignmentEventAttachments } from './AssignmentEventAttachments'
import useProfile from '@/hooks/useProfile'
import { AssignmentEventDetails } from '@/pages/assignments/StudentAssignmentPage'
import { VITE_PYLON_URL } from '@/env'

export function AssignmentEventUploads({
  assignmentEventDetails,
  setAssignmentEventDetails,
}: {
  assignmentEventDetails: AssignmentEventDetails
  setAssignmentEventDetails: (e: AssignmentEventDetails) => void
}) {
  const { profile } = useProfile()

  const handleDrop = useCallback(function (files, handleUpload) {
    handleUpload(files)
  }, [])

  function handleAttachment(signedIds: number[]) {
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      uploadsSignedIds: [...(assignmentEventDetails.uploadsSignedIds || []), ...signedIds],
    })
  }

  // For now, only allow admins to use this feature
  if (!profile.isAdmin) {
    return null
  }

  return (
    <div className="box pb-2">
      <DirectUploadProvider
        multiple
        headers={{
          Authorization: `Token token="${auth.token}"`,
        }}
        directUploadsPath={`${VITE_PYLON_URL}/direct_uploads`}
        onSuccess={handleAttachment}
        // @ts-ignore - no types
        render={({ handleUpload, uploads }) => {
          return (
            <div>
              <div className="mb-4">
                <Dropzone onDrop={acceptedFiles => handleDrop(acceptedFiles, handleUpload)}>
                  {({ isDragActive, getRootProps, getInputProps }) => (
                    <div className="notification has-background-grey-lighter has-cursor-pointer">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        {isDragActive ? <div>Drop the files here ...</div> : null}

                        {uploads.length === 0 && !isDragActive ? (
                          <div>Drag 'n' drop some files here, or click to select files</div>
                        ) : (
                          // @ts-ignore - no-types
                          uploads.map(upload => {
                            switch (upload.state) {
                              case 'waiting':
                                return (
                                  <nav key={upload.id} className="level">
                                    <div className="level-item is-justify-content-left">
                                      Waiting to upload {upload.file.name}
                                    </div>
                                  </nav>
                                )
                              case 'uploading':
                                return (
                                  <nav key={upload.id} className="level">
                                    <div className="level-item is-justify-content-left">
                                      Uploading {upload.file.name}
                                    </div>
                                    <div className="level-item is-justify-content-right">
                                      <progress className="progress is-success" value={upload.progress} max="100">
                                        {upload.progress}%
                                      </progress>
                                    </div>
                                  </nav>
                                )
                              case 'error':
                                return (
                                  <nav key={upload.id} className="level">
                                    <div className="level-item is-justify-content-left">
                                      Error uploading {upload.file.name}: {upload.error}
                                    </div>
                                  </nav>
                                )
                              case 'finished':
                                return (
                                  <nav key={upload.id} className="level">
                                    <div className="level-item is-justify-content-left">
                                      Finished uploading {upload.file.name}
                                    </div>
                                  </nav>
                                )
                            }
                          })
                        )}
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
          )
        }}
      />
      <AssignmentEventAttachments assignmentEvent={assignmentEventDetails} />
    </div>
  )
}
