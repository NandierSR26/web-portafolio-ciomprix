import React from 'react'
import styles from './ModalVideo.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useMainContext } from '../../context'
import { Loader } from '../Loader'

export const ModalVideo = () => {

    const { videoModalOpen, setVideoModalOpen, setVideoContentUrl, videoContentUrl } = useMainContext()

    if(!videoContentUrl && videoModalOpen) return <Loader />

    return (
        <>
            <div className={`${styles.modalvideo__backdrop} ${videoModalOpen ? 'grid' : 'hidden'}`}>
                <div className={styles.modalvideo__video_container}>
                    <video 
                        src={`${videoContentUrl}`}
                        controls
                    ></video>
                </div>

                <div className="absolute top-0 right-0 p-3">
                    <button 
                        className="bg-transparent"
                        onClick={() => {
                            setVideoModalOpen(false)
                            setVideoContentUrl(null)
                        }}
                    >
                        <FontAwesomeIcon icon={faClose} className="text-white text-2xl" />
                    </button>
                </div>
            </div>

        </>
    )
}
