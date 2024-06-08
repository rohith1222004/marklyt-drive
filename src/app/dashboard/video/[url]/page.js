"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const page = () => {
    const params = useParams();
    const url = params.url;
    console.log('====================================');
    console.log(url);
    console.log('====================================');
    
    function decodeURL(encodedUrl) {
        try {
          const decodedUrl = decodeURIComponent(encodedUrl);
          return decodedUrl;
        } catch (error) {
          console.error('Error decoding URL:', error);
          return encodedUrl; // Return the original URL if decoding fails
        }
      }
    let decUrl = decodeURL(url)

    return (
        <video width="320" height="240" controls preload="none">
          <source src={decUrl} type="video/mp4" />
          <track
            src="/path/to/captions.vtt"
            kind="subtitles"    
            srcLang="en"
            label="English"
          />
          Your browser does not support the video tag.
        </video>
      )
}

export default page