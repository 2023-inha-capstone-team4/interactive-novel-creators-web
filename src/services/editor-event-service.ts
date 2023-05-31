/**
 * 에디터에서 전송하는 메시지를 처리하는 이벤트 핸들러입니다.
 * 에디터에서 `postMessage`를 통해 메시지를 전송할 때,
 * `message` 이벤트에 대해 해당 핸들러를 추가하여 사용 가능합니다.
 */
export function handleEditorMessageEvent(e: MessageEvent<EditorMessage>) {
  const { type, payload } = e.data;

  switch (type) {
    case 'hello': // test
      console.log('hello event : ', payload);
      break;
  }
}

/**
 * 에디터에서 전송하는 메시지 데이터의 형식을 나타내는 인터페이스입니다.
 */
interface EditorMessage {
  type: string;
  payload: any;
}
