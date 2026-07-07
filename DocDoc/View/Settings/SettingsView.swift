//
//  SettingsView.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import Foundation
import SwiftUI

struct SettingsView: View {
    @State private var isAutoImproveOn: Bool = true
    @State private var isAutoCropOn: Bool = true
    @State private var saveOriginals: Bool = false
    @State private var selectedPDFOption: String = "Высокое"
    
    private var options = ["Высокое", "Среднее", "Низкое"]
    
    var body: some View {
        VStack {
            HStack {
                Text("НАСТРОЙКИ")
                    .font(.title)
                    .bold()
                    .padding()
                Spacer()
            }
            List {
                Section(header: Text("СКАНИРОВАНИЕ")) {
                    HStack {
                        Text("Авто-улучшение")
                        Spacer()
                        Toggle("", isOn: $isAutoCropOn)
                    }
                    HStack {
                        Text("Обрезка границ")
                        Spacer()
                        Toggle("", isOn: $isAutoImproveOn)
                    }
                    
                    HStack {
                        Text("Качество страниц по умолчанию")
                        Spacer()
                        Picker("", selection: $selectedPDFOption) {
                            ForEach(options, id: \.self) {
                                Text($0)
                            }
                        }
                        .padding()
                    }
                }
                
                Section(header: Text("ХРАНЕНИЕ")) {
                    HStack {
                        Text("Сохранять оригиналы")
                        Spacer()
                        Toggle("", isOn: $saveOriginals)
                    }
                    
                    HStack {
                        Text("Использовано")
                        Spacer()
                        Text("24MB / 1 GB")
                    }
                }
                
                Section(header: Text("О ПРИЛОЖЕНИИ"))
                {
                    HStack {
                        Text("Версия")
                        Spacer()
                        Text("1.0.0")
                    }
                }
            }
        }
        .background(Color(.background))
    }
}


#Preview {
    SettingsView()
}
