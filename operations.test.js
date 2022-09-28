const { mean, median, mode } = require('./operations');

describe("testing mean", function(){
    test("test mean success", function(){
        expect(mean([1,2,3,4,5])).toEqual(3);
        expect(mean([1])).toEqual(1);
    });
    test("test mean error", function(){
        expect(()=>{
            mean(["foo",1,2,3]);
        }).toThrow();
        expect(()=>{
            mean();
        }).toThrow();
    });
});

describe("testing median", function(){
    test("test median success", function(){
        expect(median([1,2,3,4,5])).toEqual(3);
        expect(median([1,2,2,4])).toEqual(2);
        expect(median([1])).toEqual(1);
    });
    test("test median error", function(){
        expect(()=>{
            median(["foo",1,2,3]);
        }).toThrow();
        expect(()=>{
            median();
        }).toThrow();
    });
});

describe("testing mode", function(){
    test("test mode success", function(){
        expect(mode([1,2,1,3,3,3,5])).toEqual(3);
        expect(mode([1])).toEqual(1);
    });
    test("test mode error", function(){
        expect(()=>{
            mode(["foo",1,2,3]);
        }).toThrow();
        expect(()=>{
            mode();
        }).toThrow();
    });
});