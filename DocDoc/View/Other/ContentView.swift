//
//  ContentView.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import Foundation
import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            MainView()
                .tabItem {
                    Label("Main", systemImage: "house")
                }
            DocumentsView()
                .tabItem {
                    Label("Documents", systemImage: "folder")
                }
            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
        }
    }
}

#Preview {
    ContentView()
}
