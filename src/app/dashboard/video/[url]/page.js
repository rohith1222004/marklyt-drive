"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams();
    const url = params.url;
    
    function decodeURL(encodedUrl) {
        try {
          const decodedUrl = decodeURIComponent(encodedUrl);
          return decodedUrl;
        } catch (error) {
          console.error('Error decoding URL:', error);
          return encodedUrl;
        }
      }
    let decUrl = decodeURL(url)

    return (
 
        <div className="flex items-center justify-center ">
        <video  controls preload="none">
          <source src={decUrl} type="video/mp4" />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"    
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      )
}

export default page