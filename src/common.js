const EMPTYVALUE = "...Empty..."
const staticImagePAth = "https://stackbybucketprod.s3-ap-southeast-1.amazonaws.com/userprofile.png"
const multiSelect = "multiSelect"
const select = "select"
const multiCollaborator = "multiCollaborator"
const collaborator = "collaborator"

const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const dummyOptions = [
    { id: "...Empty...", value: "...Empty", label: "...Empty", color: "#ddd" }
]

const isEmpty = (value) => {
    return value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
}

const colorIsLight = (hexColor) => {
    var r = parseInt(hexColor.substr(1, 2), 16);
    var g = parseInt(hexColor.substr(3, 2), 16);
    var b = parseInt(hexColor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq < 186
}

const ColorSelection = [
    {
        color: "#CFDFFF"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#D0F0FD"
    },
    {
        color: "#FEE2D5"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#D13A3F"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#3F51B5"
    },
    {
        color: "#E8D0E8"
    },
    {
        color: "#CEF2E0"
    },
    {
        color: "#D1F7C4"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#34558B"
    },
    {
        color: "#FF9800"
    },
    {
        color: "#C2F5E9"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#FFEAB6"
    },
    {
        color: "#CCCCCC"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#EB144C"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#090707"
    },
    {
        color: "#CFDFFF"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#D0F0FD"
    },
    {
        color: "#FEE2D5"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#D13A3F"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#3F51B5"
    },
    {
        color: "#E8D0E8"
    },
    {
        color: "#CEF2E0"
    },
    {
        color: "#D1F7C4"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#34558B"
    },
    {
        color: "#FF9800"
    },
    {
        color: "#C2F5E9"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#FFEAB6"
    },
    {
        color: "#CCCCCC"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#EB144C"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#090707"
    },
    {
        color: "#CFDFFF"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#D0F0FD"
    },
    {
        color: "#FEE2D5"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#D13A3F"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#3F51B5"
    },
    {
        color: "#E8D0E8"
    },
    {
        color: "#CEF2E0"
    },
    {
        color: "#D1F7C4"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#34558B"
    },
    {
        color: "#FF9800"
    },
    {
        color: "#C2F5E9"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#FFEAB6"
    },
    {
        color: "#CCCCCC"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#EB144C"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#090707"
    },
    {
        color: "#CFDFFF"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#D0F0FD"
    },
    {
        color: "#FEE2D5"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#D13A3F"
    },
    {
        color: "#3384F7"
    },
    {
        color: "#3F51B5"
    },
    {
        color: "#E8D0E8"
    },
    {
        color: "#CEF2E0"
    },
    {
        color: "#D1F7C4"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#34558B"
    },
    {
        color: "#FF9800"
    },
    {
        color: "#C2F5E9"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#FFEAB6"
    },
    {
        color: "#CCCCCC"
    },
    {
        color: "#E1EBEA"
    },
    {
        color: "#9900EF"
    },
    {
        color: "#EB144C"
    },
    {
        color: "#BF360C"
    },
    {
        color: "#090707"
    }
]

export { multiSelect, select, multiCollaborator, collaborator, dummyOptions, EMPTYVALUE, staticImagePAth, isEmpty, colorIsLight, ColorSelection, oneDay, todayTimestamp, date, month, year, daysMap, monthMap }