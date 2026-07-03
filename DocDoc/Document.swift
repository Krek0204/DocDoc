//
//  Document.swift
//  DocDoc
//
//  Created by Сергей Мещеряков on 03.07.2026.
//

import Foundation

struct Document: Hashable {
    var title: String
    var pagesCount: Int
    var image: String
}

// MARK: - Mock Documents

extension Document {

    static var mockDocuments: [Document] {
        return [
            Document(
                title: "Договор аренды",
                pagesCount: 12,
                image: "doc.fill"
            ),
            Document(
                title: "Паспорт РФ",
                pagesCount: 2,
                image: "passport"
            ),
            Document(
                title: "Счёт-фактура №45",
                pagesCount: 1,
                image: "doc.text.fill"
            ),
            Document(
                title: "Техническое задание",
                pagesCount: 24,
                image: "doc.richtext.fill"
            ),
            Document(
                title: "Доверенность",
                pagesCount: 3,
                image: "doc.badge.plus"
            ),
            Document(
                title: "Акт выполненных работ",
                pagesCount: 5,
                image: "checkmark.doc.fill"
            ),
            Document(
                title: "Свидетельство о регистрации",
                pagesCount: 4,
                image: "doc.circle.fill"
            ),
            Document(
                title: "Приказ №127",
                pagesCount: 2,
                image: "doc.text.magnifyingglass"
            )
        ]
    }
    
    static var mockDocument: Document {
        return mockDocuments[0]
    }
    
    static var mockDocumentsWithDifferentTypes: [Document] {
        return [
            Document(title: "Пустой документ", pagesCount: 0, image: "doc"),
            Document(title: "Короткий документ", pagesCount: 1, image: "doc.text"),
            Document(title: "Средний документ", pagesCount: 10, image: "doc.plaintext"),
            Document(title: "Большой документ", pagesCount: 100, image: "doc.plaintext.fill"),
            Document(title: "Очень большой документ", pagesCount: 500, image: "doc.plaintext.fill")
        ]
    }
}

// MARK: - Usage Examples

/*
 // Получить список моков:
 let documents = Document.mockDocuments
 
 // Получить один мок:
 let doc = Document.mockDocument
 
 // Получить моки с разным количеством страниц:
 let docs = Document.mockDocumentsWithDifferentTypes
 */
