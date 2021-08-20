/* Your Code Here */
let createEmployeeRecord = function(fourElementArray) {//function([firstName, familyName, title, payPerHour]) {
    return {
        firstName: fourElementArray[0],
        familyName: fourElementArray[1],
        title: fourElementArray[2], 
        payPerHour: fourElementArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayOfArrays) {
    return arrayOfArrays.map( recordObject => createEmployeeRecord((recordObject)))
}

let createTimeInEvent = function(dateStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    )
    return this 
}

let createTimeOutEvent = function(dateStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this
}

let hoursWorkedOnDate = function(dateStamp) {
    let timeIn = this.timeInEvents.find(r => r.date === dateStamp).hour
    let timeOut = this.timeOutEvents.find(r => r.date === dateStamp).hour
    return (timeOut - timeIn) / 100
}

let wagesEarnedOnDate = function(dateStamp) {
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find( rec => rec.firstName === firstName)
}

let calculatePayroll = function(srcArray) {
    return srcArray.reduce(function(accumulator, record) {
       return accumulator + allWagesFor.call(record) // if it doesnt have an argument, we'll MAKE it have one
    }, 0)
}