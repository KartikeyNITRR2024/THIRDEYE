import React from 'react'
import Navigationbar from '../Components/NavigationComponents/Navigationbar'
import Loginbox from '../Components/LoginComponents/Loginbox'
import Notifier from '../Components/NotificationComponents/Notifier'
import Loader from '../Components/LoaderComponents/Loader'
export default function EntryPage() {
  return (
    <>
        <Notifier></Notifier>
        <Navigationbar></Navigationbar>
        <Loginbox></Loginbox>
        <Loader></Loader>
    </>
  )
}