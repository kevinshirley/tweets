import { SagaIterator } from "redux-saga";
import { put, takeEvery, all, call, take } from "redux-saga/effects";

import { fetchTrumpTweets, latestTrumpTweets, fetchHillaryTweets, latestHillaryTweets } from "../actions/tweetsActions";
import { FETCH_TRUMP_TWEETS, LATEST_TRUMP_TWEETS, FETCH_HILLARY_TWEETS, LATEST_HILLARY_TWEETS } from "../actions";

function* watchFetchData(): SagaIterator {
    while (true) {
        yield take(FETCH_TRUMP_TWEETS);
        yield take(LATEST_TRUMP_TWEETS);
        yield take(FETCH_HILLARY_TWEETS);
        yield take(LATEST_HILLARY_TWEETS);
        // yield put(fetchTrumpTweets());
        // yield put(latestTrumpTweets());
        // yield put(fetchHillaryTweets());
        // yield put(latestHillaryTweets());
    }
}

// TODO: Define type
function* rootSaga(): any {
    yield all([
        watchFetchData(),
    ]);
}

export default rootSaga;
