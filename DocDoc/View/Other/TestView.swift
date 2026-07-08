// import SwiftUI
//
// struct KontentView: View {
//    @State private var selectedOption = "Москва"
//    let options = ["Москва", "СПб", "Казань", "Новосибирск"]
//
//    var body: some View {
//        VStack {
//            Picker("Выберите город", selection: $selectedOption) {
//                ForEach(options, id: \.self) {
//                    Text($0)
//                }
//            }
//
//            Text("Выбрано: \(selectedOption)")
//        }
//        .padding()
//    }
// }
//
// #Preview {
//    KontentView()
// }
