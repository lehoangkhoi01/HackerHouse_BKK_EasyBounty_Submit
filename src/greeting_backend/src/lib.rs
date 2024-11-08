use std::cell::RefCell;
thread_local! {
    static USERS_LIST: RefCell<Vec<String>> = RefCell::new(vec![]);
}
#[ic_cdk::update]
fn greet(name: String) -> String {
    USERS_LIST.with_borrow_mut(|users| {
        users.push(name.clone());
    });
    return format!("Hello, {}!", name);
}
#[ic_cdk::query]
fn submittedNames() -> Vec<String> {
    USERS_LIST.with_borrow(|users| users.clone())
}
ic_cdk::export_candid!();