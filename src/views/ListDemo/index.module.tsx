import { Effect, EffectModule, ImmerReducer, Module, Reducer } from '@sigi/core';
import { EMPTY, Observable, catchError, combineLatestWith, distinctUntilChanged, exhaustMap, from, map } from 'rxjs';
import { ListDemoApi } from './index.api';

const defaultState = {
  // 新增/修改 modal or drawer
  isEdit: false,
  openDrawer: false,
  openModal: false,
  // 查询数据
  queryParams: {
    name: '',
    type: null,
    date: undefined,
  },
  tempData: {} as any,
  dataList: [] as any,
};

type ListDemoState = typeof defaultState;

@Module('ListDemo')
export class ListDemoModule extends EffectModule<ListDemoState> {
  defaultState: ListDemoState = defaultState;
  ListDemoService: ListDemoApi;
  // constructor(private readonly ListDemoService: ListDemoApi) {
  constructor() {
    super();
    this.ListDemoService = new ListDemoApi();
  }

  @Reducer()
  setState(state: ListDemoState, newState: Partial<ListDemoState>) {
    return { ...state, ...newState };
  }
  @ImmerReducer()
  setQueryParams(state: ListDemoState, payload: any) {
    state.queryParams = { ...state.queryParams, ...payload };
  }
  @Reducer()
  setTempDataState(state: ListDemoState, tempData: ListDemoState['tempData']) {
    return { ...state, tempData: tempData || {} };
  }
  @ImmerReducer()
  resetParams(state: ListDemoState) {
    state.queryParams = defaultState.queryParams;
  }

  @Effect()
  getTempData(payload$: Observable<number>) {
    console.log(this);
    return payload$.pipe(
      exhaustMap((payload) => {
        console.log({ payload });
        return from(this.ListDemoService.getDetail({ id: payload })).pipe(
          map((res: any) => {
            return this.getActions().setState({ tempData: res || { name: '456', id: 123 } });
          }),
          catchError((err) => {
            console.log(err);
            return EMPTY;
          }),
        );
      }),
      catchError((err) => {
        console.log(err);
        return EMPTY;
      }),
    );
  }

  @Effect()
  getPageListWatch(payload$: Observable<void>) {
    return payload$.pipe(
      combineLatestWith(this.state$.pipe(distinctUntilChanged((a, b) => a.queryParams.name === b.queryParams.name))),
      exhaustMap(([p, state]) => {
        console.log({ p, state });
        return from(
          this.ListDemoService.getPageList({
            ...state.queryParams,
          }),
        ).pipe(
          map((res: any) => {
            return this.getActions().setState({
              dataList: res || [],
            });
          }),
          catchError((err) => {
            console.log(err);
            return EMPTY;
          }),
        );
      }),
      catchError((err) => {
        console.log(err);
        return EMPTY;
      }),
    );
  }
}
