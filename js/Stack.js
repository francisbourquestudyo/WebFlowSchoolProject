function pushCurrentValueInStack() {
        switch (gCurrentColorValue) {
            case 1: gStackColor1.push(gAddresseCourante); break;
            case 2: gStackColor2.push(gAddresseCourante); break;
            case 3: gStackColor3.push(gAddresseCourante); break;
            case 4: gStackColor4.push(gAddresseCourante); break;
            case 5: gStackColor5.push(gAddresseCourante); break;
        }
    }

    function popNextValueInStack(value) {
        switch (value) {
            case 1: return gStackColor1.pop();
            case 2: return gStackColor2.pop();
            case 3: return gStackColor3.pop();
            case 4: return gStackColor4.pop();
            case 5: return gStackColor5.pop();
        }
    }   

    function lastValueInStack(value) {
        switch (value) {
            case 1: return gStackColor1.slice(-1)[0];
            case 2: return gStackColor2.slice(-1)[0];
            case 3: return gStackColor3.slice(-1)[0];
            case 4: return gStackColor4.slice(-1)[0];
            case 5: return gStackColor5.slice(-1)[0];
        }
    }

    function stackIsEmptyForValue(value) {
        switch (value) {
            case 1: return gStackColor1.lenght == 0;
            case 2: return gStackColor2.lenght == 0;
            case 3: return gStackColor3.lenght == 0;
            case 4: return gStackColor4.lenght == 0;
            case 5: return gStackColor5.lenght == 0;
        }   
    }

    function stackContainsAddress(value, address) {
        switch (value) {
            case 1: return gStackColor1.indexOf(address) != -1;
            case 2: return gStackColor2.indexOf(address) != -1;
            case 3: return gStackColor3.indexOf(address) != -1;
            case 4: return gStackColor4.indexOf(address) != -1;
            case 5: return gStackColor5.indexOf(address) != -1;
        }   
    }

    function clearStackForValue(value) {
        switch (value) {
            case 1: return gStackColor1 = [];
            case 2: return gStackColor2 = [];
            case 3: return gStackColor3 = [];
            case 4: return gStackColor4 = [];
            case 5: return gStackColor5 = [];
        }
    }