import Image from 'next/image'
import React from 'react'
import type { StaticImageData } from 'next/image'
import Monica from '../../public/Monica.png'
import David from '../../public/David.png'
import Douglas from '../../public/DouglasSlaughter.png'
import Christopher from '../../public/ChristopherMcarthy.png'
import Shumway from '../../public/clay-shumway.png'

// Not a static `import` — see the identical comment in components/data/doctors.tsx.
// A webpack static import here would bundle the image (and its filename)
// into every client-reachable chunk that renders this component,
// regardless of the showFeaturedDoctor value at runtime. Alt text is also
// kept generic (matching the numbered "Avatar 0N" pattern already used
// below) rather than naming the doctor, so no identifying string is baked
// into this component's compiled JS in the hidden branch either.
const FEATURED_DOCTOR_IMG: StaticImageData = { src: '/ScottKatzman.png', width: 275, height: 286 };

export default function DoctorsAvatar({tag, condition, showFeaturedDoctor} : {tag : string, condition : string, showFeaturedDoctor: boolean}) {
  if (tag === 'Foot' || tag === 'Ankle') {
    return (
      <div className="flex -space-x-3">
        <Image
          className="rounded-full ring-2 ring-white object-cover"
          style={{ width: '40px', height: '40px' }}
          src={Shumway}
          width={40}
          height={40}
          alt="Avatar 01"
        />
        {showFeaturedDoctor && (
          <Image
            className="rounded-full ring-2 ring-white object-cover"
            style={{ width: '40px', height: '40px' }}
            src={FEATURED_DOCTOR_IMG}
            width={40}
            height={40}
            alt="Avatar 02"
          />
        )}
      </div>
    )
  }
  return (
    <div className="flex -space-x-3">
      {showFeaturedDoctor && (
        <Image
          className="rounded-full ring-2 ring-white object-cover"
          style={{ width: '40px', height: '40px' }}
          src={FEATURED_DOCTOR_IMG}
          width={40}
          height={40}
          alt="Avatar 01"
        />
      )}
      <Image
        className="rounded-full ring-2 ring-white object-cover"
        style={{ width: '40px', height: '40px' }}
        src={David}
        width={40}
        height={40}
        alt="Avatar 02"
      />
      <Image
        className="rounded-full ring-2 ring-white object-cover"
        style={{ width: '40px', height: '40px' }}
        src={Douglas}
        width={40}
        height={40}
        alt="Avatar 03"
      />
      <Image
        className="rounded-full ring-2 ring-white object-cover"
        style={{ width: '40px', height: '40px' }}
        src={Christopher}
        width={40}
        height={40}
        alt="Avatar 04"
      />
      {
        condition.includes('Injections') && <Image
        className="rounded-full ring-2 ring-white object-cover"
        style={{ width: '40px', height: '40px' }}
        src={Monica}
        width={40}
        height={40}
        alt="Avatar 05"
      />}
    </div>
  )
}
