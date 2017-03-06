'use strict';

const randomGenerator = {
    getUniqueId: function () {
        let typedArr = new Uint32Array(1);
        window.crypto.getRandomValues(typedArr);
        return typedArr[0];

    }
};

export default randomGenerator;
