//
//  ContentView.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import SwiftUI

struct MainView: View {
    var body: some View {
        VStack {
            VStack(alignment: .leading) {
                HStack {
                    VStack(alignment: .leading) {
                        Text("Hi there")
                            .monospaced(true)
                            .foregroundStyle(Color.gray)
                        Text("DocDoc")
                            .font(Font.system(.largeTitle))
                            .bold()
                    }
                    Spacer()
                    Button(action: {} ) {
                        Image(systemName: "gearshape")
                            .foregroundStyle(Color.black)
                            .padding()
                    }
                }
                Rectangle()
                    .foregroundStyle(Color.blue)
                    .frame(width: 340, height: 200
                    )
                    .clipShape(RoundedRectangle(cornerRadius: 16))
                HStack {
                    Rectangle()
                        .frame(width: 165, height: 120)
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .foregroundStyle(Color.gray)
                    Rectangle()
                        .frame(width: 165, height: 120)
                        .clipShape(RoundedRectangle(cornerRadius: 16))
                        .foregroundStyle(Color.gray)
                }
                LatestDocsView(documents: Document.mockDocuments)
            }
        }
        .padding()
    }
}

#Preview {
    MainView()
}
