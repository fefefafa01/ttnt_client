import './report.css'
import {AdminHeader, StaffHeader} from '/components/Header'

//Link with ReportHandler.js in ./server
function report({type}) {
    if (type===1) {
        return (
            reportOverview()
        )
    } else {
        return (
            reportPeriod()
        )
    }
}

import 'components/ProductOverview'
function reportOverview(){
    return (
        //Product Cover Overview
        1
    )
}

import 'components/ProductPeriod'
function reportPeriod() {
    return (
        //Product Cover by Period
        1
    )
}

export {report, reportOverview, reportPeriod};