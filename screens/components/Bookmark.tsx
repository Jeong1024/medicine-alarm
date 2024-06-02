import AsyncStorage from "@react-native-async-storage/async-storage";

interface pillSearchInterface {
    resultCode: number; // 결과 코드
    resultMsg: string; // 결과 메시지
    numOfRows: number; // 한 페이지 결과 수
    pageNo: number; // 페이지 번호
    totalCount: number; // 전체 결과 수
    entpName: string; // 업체명
    itemName: string; // 제품명
    itemSeq: number; // 품목기준코드
    efcyQesitm: string; // 문항1(효능)
    useMethodQesitm: string; // 문항2(사용법)
    atpnWarnQesitm: string; // 문항3(주의사항 경고)
    atpnQesitm: string; // 문항4(주의사항)
    intrcQesitm: string; // 문항5(상호작용)
    seQesitm: string; // 문항6(부작용)
    depositMethodQesitm: string; // 문항7(보관법)
    openDe: number; // 공개일자
    updateDe: number; // 수정일자
    itemImage: string; // 낱알이미지
}

// 즐겨찾기 목록은 JSON 형식으로 저장, Array 형식으로 사용됨
// favlist = [itemSeq1, itemSeq2, ...];

// favlist 반환
const loadData = async () => {
    try {
        let favs = await AsyncStorage.getItem("favorites_pill");
        if (favs == null)
            favs = [];
        else
            favs = JSON.parse(favs);
        return favs;
    } catch (e) {
        throw e;
    }
};

// 입력받은 pillItem 저장
const storeData = async (pillItem: pillSearchInterface) => {
    try {
        let favs = await loadData();
        let newFavs = favs.concat(pillItem.itemSeq);

        await AsyncStorage.setItem("favorites_pill", JSON.stringify(newFavs));
        console.log("Bookmark Stored");
    } catch (error) {
        console.log(error);
    }
};

// 입력받은 pillItem이 존재한다면 true, 아니라면 false 반환
const retrieveData = async (pillItem: pillSearchInterface) => {
    try {
        let favs = await loadData();

        if (favs.length != 0) {
            if (favs.find(function (data) { return data == pillItem.itemSeq }) != undefined)
                return true;
            else
                return false;
        }
        else
            return false;

    } catch (error) {
        console.log(error);
    }
};

// 입력받은 pillItem을 저장소에서 삭제
const removeData = async (pillItem: pillSearchInterface) => {
    try {
        let favs = await loadData();
        const idx = favs.indexOf(pillItem.itemSeq);
        favs.splice(idx, 1);

        await AsyncStorage.setItem("favorites_pill", JSON.stringify(favs));
        console.log("Bookmark Removed");
    } catch (error) {
        console.log(error);
    }
};

export { pillSearchInterface };
export { loadData };
export { storeData };
export { retrieveData };
export { removeData };
