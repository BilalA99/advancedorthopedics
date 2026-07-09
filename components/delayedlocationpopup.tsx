"use client"

import { useEffect, useState } from "react"
import { LocationPermissionDialog } from "@/components/locationpermissiondialog"
import { useGeolocation } from "@/providers/geolocationcontext"
import { CONSENT_UPDATED_EVENT, hasFunctionalConsent } from "@/lib/consent"
interface DelayedLocationPopupProps {
  delayInSeconds?: number
  sessionStorageKey?: string
}

export function DelayedLocationPopup({
  delayInSeconds = 2.5,
  sessionStorageKey = "location_popup_shown",
}: DelayedLocationPopupProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [functionalAllowed, setFunctionalAllowed] = useState(false)
  const { onSetLocation } = useGeolocation()

  useEffect(() => {
    setFunctionalAllowed(hasFunctionalConsent())

    const handleConsentUpdated = () => setFunctionalAllowed(hasFunctionalConsent())
    window.addEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated)
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, handleConsentUpdated)
  }, [])

  useEffect(() => {
    if (!functionalAllowed) return
    // Check if the popup has already been shown in this session
    const hasBeenShown = sessionStorage.getItem(sessionStorageKey)
    const locationPermissionDenied = localStorage.getItem("location_permission_denied")
    if (!hasBeenShown && locationPermissionDenied !== "true") {
      // Set a timeout to show the popup after the specified delay
      const timer = setTimeout(() => {
        setShowPopup(true)
        // Mark that the popup has been shown in this session
        sessionStorage.setItem(sessionStorageKey, "true")
      }, delayInSeconds * 1000)
      // Clean up the timer if the component unmounts
      return () => clearTimeout(timer)
    }
  }, [delayInSeconds, functionalAllowed, sessionStorageKey])

  const handleLocationGranted = (position: GeolocationPosition) => {
    // Here you would typically call an API to find the nearest clinic
    localStorage.setItem("location_permission_denied", "false")
    onSetLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      error: null,
    })
    setShowPopup(false)
    // You could store the coordinates in localStorage or context for use elsewhere
    // localStorage.setItem("user_latitude", position.coords.latitude.toString())
    // localStorage.setItem("user_longitude", position.coords.longitude.toString())
  }

  const handleLocationDenied = () => {
    // You could set a flag in localStorage to remember the user's preference
    localStorage.setItem("location_permission_denied", "true")
    setShowPopup(false)
  }

  if (!showPopup) return null

  return <LocationPermissionDialog onLocationGranted={handleLocationGranted} onLocationDenied={handleLocationDenied} />
}
